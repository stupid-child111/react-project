import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"]
    }
})

export function getReceiverSocketId(userId){
    return userSocketMap[userId];
}

//保存在线用户
const userSocketMap = {}  //{userId: socketId}


io.on("connection", (socket) => {
    console.log(`${socket.id} 已连接`, socket.id);

    const userId = socket.handshake.query.userId
    if (userId) userSocketMap[userId] = socket.id;

    //发布事件给所有已经连接的客户端
    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    socket.on(`${socket.id}断开连接`, () => {
        console.log(`${socket.id}断开连接`, socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})

export { io, app, server }