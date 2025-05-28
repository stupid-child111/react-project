import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

function NavBar() {
    const {authUser} = useAuthStore()
  return (
    <div>NavBar</div>
  )
}

export default NavBar