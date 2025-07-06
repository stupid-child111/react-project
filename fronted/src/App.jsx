import React, { useEffect } from 'react'
import NavBar from './components/NavBar.jsx'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import { useAuthStore } from './store/useAuthStore.js'
import { useThemeStore } from './store/useThemeStore.js'
import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast'

function App() {
  const { authUser, checkAuth, isCheckingAuth,onlineUsers } = useAuthStore();
  console.log("在线",onlineUsers)
  const { theme } = useThemeStore()
  useEffect(() => {
    checkAuth()
  }, [checkAuth]);
  console.log({ authUser })

  if (isCheckingAuth && !authUser) return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin" />
    </div>
  )



  return (
    <div data-theme={theme}>
      <NavBar />
      <Routes>
        {/* <Route path="/" element={authUser ? <HomePage /> : <LoginPage />} /> */}
        {/* 上面这种有什么不好的 */}
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/setting" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        {/* <Route path="*" element={<div>404 Not Found</div>} /> */}
      </Routes>

      <Toaster />
    </div>
  )
}

export default App