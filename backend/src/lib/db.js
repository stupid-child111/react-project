import mongoose from 'mongoose';

export const connectDB = async() => {
    try{
       const conn =  await mongoose.connect(process.env.MONGODB_URL);
        console.log(`成功连接: ${conn.connection.host}`);
    }
    catch(error){
        console.error(`Error! : ${error.message}`,error);
    }
};



// import { MongoClient, ServerApiVersion } from 'mongodb';
// import dotenv from 'dotenv';

// dotenv.config(); // 建议在项目入口统一加载，此处可移除
// console.log('加载的 MONGODB_URL:', process.env.MONGODB_URL);
// const url = process.env.MONGODB_URL;

// if (!url) {
//   throw new Error('MONGODB_URL 环境变量未设置');
// }

// const client = new MongoClient(url, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     tls:true,
//     deprecationErrors: true,
//   }
// });

// export const connectDB = async () => {
//   try {
//     await client.connect();
//     await client.db("admin").command({ ping: 1 });
//     console.log("成功连接到 MongoDB!");
//   } catch (error) {
//     console.error("数据库连接失败:", error);
//     throw error; // 向上抛出错误，供启动函数捕获
//   } finally {
//     // 生产环境中建议保持连接，除非明确需要关闭
//     // await client.close();
//   }
// };