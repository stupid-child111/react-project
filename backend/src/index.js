import express from 'express'; // ES6 import syntax     修改导入   type:'module'
import authRoutes from './routes/auth.route.js'; // 用于保存本地文件
import cors from 'cors';

import messageRoutes from './routes/message.route.js'; // 用于保存本地文件


import dotenv from 'dotenv'; // 用于加载环境变量
import cookieParser from 'cookie-parser';
import { connectDB } from './lib/db.js';
dotenv.config(); // 加载环境变量  可以使用 PORT 等环境变量
const app = express();
const PORT = process.env.PORT;//加载环境变量后可访问    为什么这个没用
// const PORT = 5009;//加载环境变量后可访问    为什么这个没用

// CORS配置
app.use(cors({
    origin: 'http://localhost:5173', // 您的前端URL
    credentials: true, // 允许发送cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));


app.use(express.json());

app.use(cookieParser());

app.use('/api/auth', authRoutes);//挂载中间件


app.use("/api/message",messageRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`);
    connectDB(); // 连接数据库
})