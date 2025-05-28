//状态和功能
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { data } from "react-router-dom";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data })
        } catch (error) {
            set({ authUser: null });
            console.log("Error in checkAuth", error);
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: async () => {
        set({ isSigningUp: true })
        try {
            const res = await axiosInstance.post('/auth/signup', data)
            set({ authUser: res.data });
            toast.success("您已成功注册")
        } catch (error) {
            toast.error(error.response.data.message)//为什么这个是response  是error自带的吗??
            console.log(error.message, "打印失败日志")
        } finally {
            set({ isSigningUp: false });
        }
    }
}));