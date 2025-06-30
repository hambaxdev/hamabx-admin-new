import Logo from '@/components/template/Logo'
import Alert from '@/components/ui/Alert'
import ResendEmailVerificationForm from './components/ResendEmailVerificationForm'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import { useThemeStore } from '@/store/themeStore'

const ResendEmailVerification = () => {
    const [message, setMessage] = useTimeOutMessage()
    const [success, setSuccess] = useTimeOutMessage()
    const mode = useThemeStore((state) => state.mode)

    return (
        <>
            <div className="mb-8">
                <Logo type="full" mode={mode} imgClass="mx-auto" logoWidth={120} />
            </div>
            <div className="mb-8 text-center">
                <h3 className="mb-2">Verify your email</h3>
                <p className="font-semibold heading-text">
                    Enter your email to resend the verification link.
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
            <ResendEmailVerificationForm
                setMessage={setMessage}
                setSuccess={setSuccess}
            />
        </>
    )
}

export default ResendEmailVerification
