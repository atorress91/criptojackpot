'use client'

import { TokenService } from '@/services/tokenService'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type AuthGuardProps = {
    children: React.ReactNode
    requireAuth: boolean
}

export const AuthGuard = ({ children, requireAuth }: AuthGuardProps) => {
    const router = useRouter()
    const [isChecking, setIsChecking] = useState(true)

    useEffect(() => {
        const checkAuth = () => {
            const token = TokenService.getToken()

            if (requireAuth && !token) {
                router.push('/login')
            } else if (!requireAuth && token) {
                router.push('/app')
            } else {
                setIsChecking(false)
            }
        }

        checkAuth()
    }, [requireAuth, router])

    if (isChecking) {
        return <div>Loading...</div>
    }

    return <>{children}</>
}