import { onAuthStateChanged, User } from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../services/firebase'

type AuthContextData = {
    user: User | null
    isLoading: boolean
}

const AuthContext = createContext<AuthContextData>({ user: null, isLoading: true })

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            setUser(user)
            setIsLoading(false)
        })
    }, [])

    return (
        <AuthContext.Provider value={{ user, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}
