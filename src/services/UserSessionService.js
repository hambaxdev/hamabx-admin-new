// services/UserSessionService.js
import { apiGetCurrentUser } from '@/services/AuthService'
import { useSessionUser } from '@/store/authStore'

export async function refreshUserSession() {
    try {
        const updatedUser = await apiGetCurrentUser()
        const { setUser } = useSessionUser.getState()

        setUser({
            ...updatedUser,
            isOnCompleteRegistrationPage: false,
        })

        console.log('User session refreshed successfully:', updatedUser);
        return updatedUser
    } catch (err) {
        console.error('Failed to refresh user session:', err)
        throw err
    }
}
