//状态和功能
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { data } from "react-router-dom";
import toast from "react-hot-toast";
import { LogOut } from "lucide-react";

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
            console.log("Error in checkAuth", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true })
        try {
            const res = await axiosInstance.post('/auth/signup', data)
            toast.success("您已成功注册")
            set({ authUser: res.data });
        } catch (error) {
            toast.error(error.response.data.message)//为什么这个是response  是error自带的吗??
            console.log(error.message, "打印失败日志")
        } finally {
            set({ isSigningUp: false });
        }
    },
    logout: async () => {
        try {
            await axiosInstance.post("auth/logout");
            set({ authUser: null });
            toast.success("您已成功登出");
        } catch (error) {
            toast.error("登出失败，请稍后再试");
            console.log("Error in logout", error.response.data.message);
        }
    },
    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("登录成功");
        } catch (error) {
            toast.error(error.response.data.message);
            console.log("Error in login", error);
        } finally {
            set({ isLoggingIn: false });
        }
    },
    updateProfile: async (data) => { 
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data });
            toast.success("个人资料更新成功");
        } catch (error) {
            toast.error(error.response.data.message);
            console.log("Error in updateProfile", error);
        } finally {
            set({ isUpdatingProfile: false });
        }
    }

}));