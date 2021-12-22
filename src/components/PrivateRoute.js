import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
export default function PrivateRoute({ children }) {
    const { currentUser } = useAuth()
    if (!localStorage.getItem("token")) {
        return <Navigate to="/" />
    }
    else {
        return children
    }
}
