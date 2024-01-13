import { Server } from "socket.io";

let io: Server;

export const initSocket = (server: any) => {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });
    io.on("connection", (socket) => {
        socket.on("disconnect", () => {
        });
    });
    io.on('error', (error) => {
    });
    
};

export const getIO = () => {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
};
