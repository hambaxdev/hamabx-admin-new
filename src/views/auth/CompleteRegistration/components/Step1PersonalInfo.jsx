import { useForm, Controller } from 'react-hook-form'
import { Form, FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import { FiInstagram, FiTwitter, FiFacebook, FiYoutube } from 'react-icons/fi'
import { countryList } from '@/constants/countries.constant'

const genderOptions = [
    { label: 'Male', value: 'MALE' },
    { label: 'Female', value: 'FEMALE' },
    { label: 'Other', value: 'OTHER' },
]

const languageOptions = [
    { label: 'Русский', value: 'ru' },
    { label: 'Deutsch', value: 'de' },
    { label: 'English', value: 'en' },
]

const Step1PersonalInfo = ({ onNext, defaultValues = {} }) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            organization: defaultValues.organization || '',
            description: defaultValues.description || '',
            firstName: defaultValues.firstName || '',
            lastName: defaultValues.lastName || '',
            gender: defaultValues.gender || '',
            birthDate: defaultValues.birthDate || '',
            nationality: defaultValues.nationality || '',
            language: defaultValues.language || '',
            instagram: defaultValues.instagram || '',
            twitter: defaultValues.twitter || '',
            facebook: defaultValues.facebook || '',
            youtube: defaultValues.youtube || '',
        },
    })

    const onSubmit = (data) => {
        onNext(data)
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormItem
                label="Organization"
                invalid={!!errors.organization}
                errorMessage="Required"
            >
                <Input {...register('organization', { required: true })} />
            </FormItem>
            <FormItem label="Description">
                <Input textArea rows={4} {...register('description')} />
            </FormItem>
            <FormItem
                label="First Name"
                invalid={!!errors.firstName}
                errorMessage="Required"
            >
                <Input {...register('firstName', { required: true })} />
            </FormItem>
            <FormItem
                label="Last Name"
                invalid={!!errors.lastName}
                errorMessage="Required"
            >
                <Input {...register('lastName', { required: true })} />
            </FormItem>

            <FormItem
                label="Gender"
                invalid={!!errors.gender}
                errorMessage="Required"
            >
                <Controller
                    name="gender"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Select
                            {...field}
                            options={genderOptions}
                            value={genderOptions.find(opt => opt.value === field.value) || null}
                            onChange={(option) => field.onChange(option?.value)}
                            placeholder="Select gender"
                            errorMessage="Required"
                        />
                    )}
                />
            </FormItem>

            <FormItem
                label="Date of Birth"
                invalid={!!errors.birthDate}
                errorMessage="Required"
            >
                <Input
                    type="date"
                    {...register('birthDate', { required: true })}
                />
            </FormItem>

            <FormItem
                label="Nationality"
                invalid={!!errors.nationality}
                errorMessage="Required"
            >
                <Controller
                    name="nationality"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Select
                            {...field}
                            options={countryList}
                            value={countryList.find(opt => opt.value === field.value) || null}
                            onChange={(option) => field.onChange(option?.value)}
                            placeholder="Select country"
                            errorMessage="Required"
                        />
                    )}
                />
            </FormItem>

            <FormItem
                label="Preferred Language"
                invalid={!!errors.language}
                errorMessage="Required"
            >
                <Controller
                    name="language"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Select
                            {...field}
                            options={languageOptions}
                            value={languageOptions.find(opt => opt.value === field.value) || null}
                            onChange={(option) => field.onChange(option?.value)}
                            placeholder="Select language"
                            errorMessage="Required"
                        />
                    )}
                />
            </FormItem>

            <div className="mt-6">
                <h4 className="text-lg font-semibold text-orange-600 mb-2">
                    Social Media
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormItem label="Instagram">
                        <div className="flex items-center gap-2">
                            <FiInstagram className="text-xl text-gray-500" />
                            <Input {...register('instagram')} placeholder="Instagram URL" />
                        </div>
                    </FormItem>
                    <FormItem label="YouTube">
                        <div className="flex items-center gap-2">
                            <FiYoutube className="text-xl text-gray-500" />
                            <Input {...register('youtube')} placeholder="YouTube URL" />
                        </div>
                    </FormItem>
                    <FormItem label="Twitter">
                        <div className="flex items-center gap-2">
                            <FiTwitter className="text-xl text-gray-500" />
                            <Input {...register('twitter')} placeholder="Twitter URL" />
                        </div>
                    </FormItem>
                    <FormItem label="Facebook">
                        <div className="flex items-center gap-2">
                            <FiFacebook className="text-xl text-gray-500" />
                            <Input {...register('facebook')} placeholder="Facebook URL" />
                        </div>
                    </FormItem>
                </div>
            </div>

            <Button type="submit" variant="solid" className="mt-6">
                Next
            </Button>
        </Form>
    )
}

export default Step1PersonalInfo
