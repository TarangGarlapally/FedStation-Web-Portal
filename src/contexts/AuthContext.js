import React, { createContext, useContext, useState, useEffect } from 'react'

import { auth } from '../firebase'
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    // useEffect(() => {
    //     onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             setCurrentUser(user)
    //         } else {
    //             setCurrentUser(null)
    //         }
    //     });
    // }, [])


    const value = {
        currentUser,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
