import { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { FormItem, Form } from '@/components/ui/Form'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { apiResendVerificationEmail } from '@/services/AuthService'
import { useAuth } from '@/auth'

const validationSchema = z.object({
    email: z.string().email('Enter a valid email address'),
})

const ResendEmailVerificationForm = ({ setMessage, setSuccess }) => {
    const [cooldown, setCooldown] = useState(0)
    const [isSubmitting, setSubmitting] = useState(false)

    const { navigateToOtpVerification } = useAuth()

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: { email: '' },
        resolver: zodResolver(validationSchema),
    })

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

    const onSubmit = async ({ email }) => {
        setSubmitting(true)
        try {
            await apiResendVerificationEmail({ email })
            reset()
            startCooldown()
            setSuccess?.('Verification email has been resent.')
            navigateToOtpVerification(email) // ⬅️ вызов из провайдера
        } catch (err) {
            const msg = err?.response?.data?.message || 'Something went wrong.'
            setMessage?.(msg)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
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
                            autoComplete="off"
                            placeholder="Enter your email"
                            {...field}
                        />
                    )}
                />
            </FormItem>
            <Button
                block
                type="submit"
                loading={isSubmitting}
                disabled={cooldown > 0}
                variant="solid"
            >
                {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend Email'}
            </Button>
        </Form>
    )
}

export default ResendEmailVerificationForm
