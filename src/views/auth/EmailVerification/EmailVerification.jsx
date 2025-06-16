import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import Logo from '@/components/template/Logo'
import Alert from '@/components/ui/Alert'
import Button from '@/components/ui/Button'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import { useThemeStore } from '@/store/themeStore'
import { useAuthFlowStore } from '@/store/authFlowStore'
import { useSessionUser } from '@/store/authStore'
import { apiResendVerificationEmail } from '@/services/AuthService'

export const EmailVerificationBase = () => {
    const [message, setMessage] = useTimeOutMessage()
    const [success, setSuccess] = useTimeOutMessage()
    const [cooldown, setCooldown] = useState(0)
    const email = useAuthFlowStore((state) => state.emailForVerification)

    const navigate = useNavigate()
    const justSignedUp = useAuthFlowStore((state) => state.justSignedUp)
    const setJustSignedUp = useAuthFlowStore((state) => state.setJustSignedUp)
    const hasHydrated = useAuthFlowStore((state) => state._hasHydrated)
    const user = useSessionUser((state) => state.user)
    const mode = useThemeStore((state) => state.mode)

    useEffect(() => {
        if (!hasHydrated) return

        if (!justSignedUp || !user?.email) {
            navigate('/sign-in')
        }
    }, [hasHydrated, justSignedUp, user, navigate])

    const startCooldown = (seconds = 60) => {
        setCooldown(seconds)
        const interval = setInterval(() => {
            setCooldown((prev) => {
                if (prev <= 1) {
                    clearInterval(interval)
                    return 0
                }
                return prev - 1
            })
        }, 1000)
    }

    const handleResendEmail = async () => {
        if (!email) {
            setMessage('Email not available.')
            return
        }

        try {
            await apiResendVerificationEmail({ email })
            setSuccess('Verification email has been resent.')
            startCooldown(60)
        } catch (err) {
            setMessage(err?.response?.data?.message || 'Failed to resend verification email.')
        }
    }

    return (
        <>
            <div className="mb-8">
                <Logo type="streamline" mode={mode} imgClass="mx-auto" logoWidth={60} />
            </div>
            <div className="mb-8 text-center">
                <h3 className="mb-2">Verify your email</h3>
                <p className="font-semibold heading-text">
                    We’ve sent a verification link to your email. Please check your inbox to complete the sign up.
                </p>
            </div>
            {message && (
                <Alert showIcon className="mb-4" type="danger">
                    <span>{message}</span>
                </Alert>
            )}
            {success && (
                <Alert showIcon className="mb-4" type="success">
                    <span>{success}</span>
                </Alert>
            )}
            <div className="mt-6 text-center">
                <p className="mb-2 font-semibold">Didn't receive the email?</p>
                <Button variant="solid" onClick={handleResendEmail} disabled={cooldown > 0}>
                    {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend Email'}
                </Button>
            </div>
        </>
    )
}

const EmailVerification = () => <EmailVerificationBase />

export default EmailVerification
