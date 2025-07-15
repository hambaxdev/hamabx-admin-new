import { useForm } from 'react-hook-form'
import { Form, FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { apiCompleteRegistration } from '@/services/RegistrationService'
import { refreshUserSession } from '@/services/UserSessionService'
import { useNavigate } from 'react-router'

const Step3Contact = ({ onBack, defaultValues = {}, onSubmit, setErrors }) => {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm({
        defaultValues: {
            phone: defaultValues.phone || '',
            website: defaultValues.website || '',
        },
    })

    const navigate = useNavigate()

    const onFinish = async (data) => {
        const payload = { ...defaultValues, ...data }

        try {
            await apiCompleteRegistration(payload)

            // Ждем полного обновления данных перед навигацией
            await refreshUserSession()

            onSubmit?.(data)
            navigate('/dashboard')
        } catch (err) {
            console.error('Registration error:', err)

            const message =
                err?.response?.data?.message ||
                'Something went wrong while completing registration.'

            setErrors([message])
        }
    }

    return (
        <Form onSubmit={handleSubmit(onFinish)}>
            <FormItem label="Phone Number">
                <Input {...register('phone')} />
            </FormItem>
            <FormItem label="Website">
                <Input {...register('website')} />
            </FormItem>
            <div className="flex justify-between mt-6">
                <Button type="button" onClick={onBack}>
                    Back
                </Button>
                <Button type="submit" variant="solid" loading={isSubmitting}>
                    Finish
                </Button>
            </div>
        </Form>
    )
}

export default Step3Contact
