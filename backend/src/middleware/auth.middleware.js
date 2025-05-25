//中间件  在准备进行修改信息时,进行操作,判断是否具有jwt

import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt   //jwt 由 utils 中定义的名字

        if (!token) {
            return req.status(401).json({ message: "没有获取对应Token" })
        }

        //解码
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        //解码失败
        if (!decoded) {
            return req.status(401).json({ message: "无效的Token" })

        }

        const user = await User.findById(decoded.userId).select("-password");  // -password   排除密码字段
        if (!user) {
            return req.status(404).json({ message: "用户未找到" })

        }

        req.user = user;  //将从数据库中查询到的 用户对象（user）挂载到 请求对象（req）上。  减少重复查询
        next();

    } catch (error) {
        console.log("Error in protectRoute middleware", error.message);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}