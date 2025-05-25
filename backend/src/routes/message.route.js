import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getUsersForSidebar, getMessages, sendMessage } from "../controllers/message.controller.js"

const router = express.Router();


router.get("/users", protectRoute, getUsersForSidebar)  //获取类似qq侧标的好友列表

router.get("/:id", protectRoute, getMessages)//点击好友后显示聊天消息

router.post("/send/:id", protectRoute, sendMessage)  //这个没听懂
export default router;