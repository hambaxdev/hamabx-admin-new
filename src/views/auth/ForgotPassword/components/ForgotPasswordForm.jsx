import { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { FormItem, Form } from '@/components/ui/Form'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuthFlowStore } from '@/store/authFlowStore'
import { apiForgotPassword } from '@/services/AuthService' // ⬅️ напрямую
import { toast } from '@/components/ui/toast' // если ты используешь уведомления

const validationSchema = z.object({
    email: z.string().email('Invalid email').min(5),
})

const ForgotPasswordForm = ({ className, setMessage, setEmailSent, emailSent, children }) => {
    const [isSubmitting, setSubmitting] = useState(false)

    const { setEmailForReset } = useAuthFlowStore()

    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({
        resolver: zodResolver(validationSchema),
    })

    const onForgotPassword = async ({ email }) => {
        setSubmitting(true)

        try {
            await apiForgotPassword({ email })
            setEmailForReset(email)
            setEmailSent?.(true)
            toast?.success?.('Reset code sent to your email.')
        } catch (error) {
            const msg =
                error?.response?.data?.message ||
                error.message ||
                'Failed to send reset email.'
            setMessage?.(msg)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className={className}>
            {!emailSent ? (
                <Form onSubmit={handleSubmit(onForgotPassword)}>
                    <FormItem
                        label="Email"
                        invalid={Boolean(errors.email)}
                        errorMessage={errors.email?.message}
                    >
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    type="email"
                                    placeholder="Email"
                                    autoComplete="off"
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
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                </Form>
            ) : (
                <>{children}</>
            )}
        </div>
    )
}

export default ForgotPasswordForm
