import { Server, Socket } from "socket.io";
import jwt from "jsonwebtoken";
import express from "express";
import http from "http";
import bidService from "../services/bidService";
import auctionService from "../services/auctionService";

interface UserDecoded { // Use an interface instead of a type
  userId: number;
  tokenVersion: number;
}

export interface AuthenticatedSocket extends Socket {
  user?: UserDecoded;
}

const sendBids = async (socket: Socket, auctionId: number) => {
  const bids = await bidService.getBidsForAuction(auctionId);
  socket.emit("getBids", bids);
};

const sendAuction = async (socket: Socket, auctionId: number) => { 
  const auction = await auctionService.getAuctionById(auctionId);
  socket.emit("getAuction", auction);
};

export const connectSocket = (app: express.Application) => {
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", 
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type"],
    },
  });

  io.use(async (socket: AuthenticatedSocket, next) => {
    try {
      const token = socket.handshake.auth.token;
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        throw new Error("Internal Server Error: JWT secret is missing"); 
      }
      socket.user = jwt.verify(token, secret) as UserDecoded; 
      next();
    } catch (err) {
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket: AuthenticatedSocket) => {
    socket.on("requestAuction", async ({ auctionId }: { auctionId: number }) => {
      const id = Number(auctionId)
      sendAuction(socket, id);
      sendBids(socket, id);
    });

    socket.on("placeBid", async (amount: number, auctionId: number) => { 
      const id = Number(auctionId)
      try {
        const userId = socket.user?.userId;
        if (!userId) {
          throw new Error("User not authenticated");
        }
        await bidService.placeBid(id, userId, amount);
        await sendBids(socket, id);
        await sendAuction(socket, id);
        socket.emit("bidSuccess", "You submitted a Bid!!!");
      } catch (error) {
        socket.emit("bidError", "Unexpected error");
      }
    });
  });

  return server;
};
