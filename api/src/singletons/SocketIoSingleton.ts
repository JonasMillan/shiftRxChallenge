import { Server, Socket } from "socket.io";

class SocketIOSingleton {
  private static instance: Server | null = null;

  constructor(io: any) {
    SocketIOSingleton.instance = io
    
    if (!SocketIOSingleton.instance) {
        throw new Error("No IO found");
        
    }

    SocketIOSingleton.instance.on("connection", (socket: Socket) => {
      console.log("client connected:", socket.id);
      socket.join('auction-new-bids');
      socket.on("disconnect", () => {
        console.log("client disconnected:", socket.id);
      });
    });
  }

  static getInstance(): Server {
    if (!SocketIOSingleton.instance) throw new Error("SocketIO instance not initialized");
    
    return SocketIOSingleton.instance;
  }
}

export default SocketIOSingleton;