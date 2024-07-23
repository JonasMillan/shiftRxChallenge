import { Server, Socket } from "socket.io";
import express from "express";
import http from "http";
import bidService from "../services/bidService";
import auctionService from "../services/auctionService";

// interface UserDecoded {
//   userId: number;
//   tokenVersion: number;
// }

// export interface AuthenticatedSocket extends Socket {
//   user?: UserDecoded;
// }

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

  io.on("connect", (socket: Socket) => {
    socket.on(
      "requestAuction",
      async ({ auctionId }: { auctionId: string }) => {
        const id = Number(auctionId);
        await sendAuction(socket, id);
        await sendBids(socket, id);
      }
    );
  });

  return server;
};
