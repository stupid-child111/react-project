import express from 'express';
import { signup, login, logout, updateProfile, checkAuth} from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
const router = express.Router();


//功能写入控制器
router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);
//注册 --》登录 --》注销

router.put("/update-profile", protectRoute, updateProfile); //protectRoute   经过身份验证  protectRoute --> updateProfile 

router.get("/check",protectRoute,checkAuth)

export default router;