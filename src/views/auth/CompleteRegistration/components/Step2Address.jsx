import { useForm, Controller } from 'react-hook-form'
import { Form, FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import { countryList } from '@/constants/countries.constant'

const Step2Address = ({ onNext, onBack, defaultValues = {} }) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            country: defaultValues.country || '',
            street: defaultValues.street || '',
            houseNumber: defaultValues.houseNumber || '',
            city: defaultValues.city || '',
            zip: defaultValues.zip || '',
        },
    })

    const onSubmit = (data) => {
        onNext(data)
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormItem
                label="Country"
                invalid={!!errors.country}
                errorMessage="Country is required"
            >
                <Controller
                    name="country"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Select
                            {...field}
                            options={countryList}
                            value={
                                countryList.find(
                                    (opt) => opt.value === field.value,
                                ) || null
                            }
                            onChange={(val) => field.onChange(val?.value)}
                            placeholder="Select country"
                        />
                    )}
                />
            </FormItem>
            <FormItem
                label="City"
                invalid={!!errors.city}
                errorMessage="City is required"
            >
                <Input {...register('city', { required: true })} />
            </FormItem>
            <FormItem
                label="Street"
                invalid={!!errors.street}
                errorMessage="Street is required"
            >
                <Input {...register('street', { required: true })} />
            </FormItem>
            <FormItem
                label="House Number"
                invalid={!!errors.houseNumber}
                errorMessage="House Number is required"
            >
                <Input {...register('houseNumber', { required: true })} />
            </FormItem>
            <FormItem
                label="Zip Code"
                invalid={!!errors.zip}
                errorMessage="Zip Code is required"
            >
                <Input {...register('zip', { required: true })} />
            </FormItem>
            <div className="flex justify-between mt-6">
                <Button type="button" onClick={onBack}>
                    Back
                </Button>
                <Button type="submit" variant="solid">
                    Next
                </Button>
            </div>
        </Form>
    )
}

export default Step2Address
