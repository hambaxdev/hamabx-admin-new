import Alert from '@/components/ui/Alert'
import OtpVerificationForm from './components/OtpVerificationForm'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import { apiResendVerificationEmail } from '@/services/AuthService'
import { useAuthFlowStore } from '@/store/authFlowStore'

export const OtpVerificationBase = () => {
    const [otpVerified, setOtpVerified] = useTimeOutMessage()
    const [otpResend, setOtpResend] = useTimeOutMessage()
    const [message, setMessage] = useTimeOutMessage()
    const email = useAuthFlowStore((state) => state.emailForVerification)

    const handleResendOtp = async () => {
        if (!email) {
            setMessage('No email found. Please sign up again.')
            return
        }

        try {
            await apiResendVerificationEmail({ email })
            setOtpResend('We have sent you a new One Time Password.')
        } catch (errors) {
            const msg =
                errors?.response?.data?.message ||
                errors.message ||
                'Failed to resend verification email.'
            setMessage(msg)
        }
    }

    return (
        <div>
            <div className="mb-8">
                <h3 className="mb-2">OTP Verification</h3>
                <p className="font-semibold heading-text">
                    We have sent you One Time Password to your email.
                </p>
            </div>
            {message && (
                <Alert showIcon className="mb-4" type="danger">
                    <span className="break-all">{message}</span>
                </Alert>
            )}
            {otpResend && (
                <Alert showIcon className="mb-4" type="info">
                    <span className="break-all">{otpResend}</span>
                </Alert>
            )}
            {otpVerified && (
                <Alert showIcon className="mb-4" type="success">
                    <span className="break-all">{otpVerified}</span>
                </Alert>
            )}
            <OtpVerificationForm
                setMessage={setMessage}
                setOtpVerified={setOtpVerified}
                onEmailVerified={() => {
                    window.location.href = '/sign-in'
                }}
            />
            <div className="mt-4 text-center">
                <span className="font-semibold">Didn't receive OTP? </span>
                <button
                    className="heading-text font-bold underline"
                    onClick={handleResendOtp}
                >
                    Resend OTP
                </button>
            </div>
        </div>
    )
}

const OtpVerification = () => {
    return <OtpVerificationBase />
}

export default OtpVerification
