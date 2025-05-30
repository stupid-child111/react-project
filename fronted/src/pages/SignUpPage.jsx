import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { MessageSquare, User, Mail, Lock, EyeOff, Eye, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern';
import toast from 'react-hot-toast';

function SignUpPage() {

    const [showPassword, setShowPassword] = useState(false)//一开始为false
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    })

    const { signup, isSigningup } = useAuthStore();  //什么时候用 {}   什么时候用 []???

    const validateForm = () => {
        if (!formData.fullName.trim()) {
            return toast.error("需要输入用户名")
        };
        if (!formData.email.trim()) {
            return toast.error("需要输入邮箱")
        };
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email)) {
            return toast.error("无效的邮箱,请重新输入");
        };
        if (!formData.password) {
            return toast.error("需要输入密码")
        };
        if (formData.password.length < 6) {
            return toast.error("密码不少于6位")
        };

        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();//阻止默认跳转  好像只要是表单提交行为都需要阻止默认

        const success = validateForm();
        if (success === true) {
            signup(formData);
        }
    }
    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* left side */}
            <div className="flex flex-col justify-center items-center p-6 sm:p-12">

                <div className="w-full max-w-md space-y-8">
                    <div className="text-center mb-8">
                        <div className="flex flex-col items-center gap-2 group">
                            <div
                                className=" size-12 rounded-xl bg-primary/10 flex items-center justify-center
                        group-hover:bg-primary/20 transition-colors">
                                <MessageSquare className="size-6 text-primary" />
                            </div>
                            <h1 className="text-2xl font-bold mt-2">Create Account</h1>
                            <p className="text-base-content/60"> Get start with your free account</p>
                        </div>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className='label'>
                                <span className="label-text font-medium">Full Name</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="size-5 text-base-content/40" />
                                </div>
                                <input
                                    type='text'
                                    className={`input input-bordered w-full pl-10 `}
                                    placeholder='Enter your full name'
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className='label'>
                                <span className="label-text font-medium">Email</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="size-5 text-base-content/40" />
                                </div>
                                <input
                                    type="email"
                                    className={`input input-bordered w-full pl-10 `}
                                    placeholder='Enter your email address'
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Password</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="size-5 text-base-content/40" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className={`input input-bordered w-full pl-10 `}
                                    placeholder='*************'
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                                <button
                                    type='button'
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="size-5 text-base-content/40" />
                                    ) : (
                                        <Eye className='size-5 text-base-control/40' />
                                    )}

                                </button>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className='btn btn-primary w-full'
                            disabled={isSigningup}
                        >
                            {isSigningup ? (
                                <>
                                    <Loader2 className='size-5 animate-spin' />
                                    Loading...
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </form>
                    <div className="text-center">
                        <p className="text-base-content/60">
                            Already have an account ?{""}
                            <Link to="/login" className='link link-primary' >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* right side */}
            <AuthImagePattern
                title="Join our community"
                subtitle="Connect with friends, share moments, and stay in touch with your loved ones"
            />
        </div>
    )
}

export default SignUpPage