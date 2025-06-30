import { useState } from 'react'
import Button from '@/components/ui/Button'
import { FormItem, Form } from '@/components/ui/Form'
import OtpInput from '@/components/shared/OtpInput'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { apiVerifyOtp } from '@/services/AuthService'
import { useAuthFlowStore } from '@/store/authFlowStore'
import { useAuth } from '@/auth'

const OTP_LENGTH = 6

const validationSchema = z.object({
    otp: z.string().min(OTP_LENGTH, { message: 'Please enter a valid OTP' }),
})

const OtpVerificationForm = ({ className, setMessage, setOtpVerified }) => {
    const [isSubmitting, setSubmitting] = useState(false)
    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({
        resolver: zodResolver(validationSchema),
    })

    const email = useAuthFlowStore.getState().emailForVerification
    const { onEmailVerified } = useAuth()

    const onOtpSend = async (values) => {
        const { otp } = values

        if (!email) {
            setMessage?.('No email found. Please sign up again.')
            return
        }

        setSubmitting(true)
        try {
            await apiVerifyOtp({ email, code: otp })
            setOtpVerified?.('Your email has been successfully verified.')
            onEmailVerified?.()
        } catch (error) {
            const msg =
                error?.response?.data?.message ||
                error.message ||
                'Verification failed.'
            setMessage?.(msg)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className={className}>
            <Form onSubmit={handleSubmit(onOtpSend)}>
                <FormItem
                    invalid={Boolean(errors.otp)}
                    errorMessage={errors.otp?.message}
                >
                    <Controller
                        name="otp"
                        control={control}
                        render={({ field }) => (
                            <OtpInput
                                placeholder=""
                                inputClass="h-[58px]"
                                length={OTP_LENGTH}
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <Button
                    block
                    loading={isSubmitting}
                    variant="solid"
                    type="submit"
                >
                    {isSubmitting ? 'Verifying...' : 'Verify OTP'}
                </Button>
            </Form>
        </div>
    )
}

export default OtpVerificationForm
