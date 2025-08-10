import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Tooltip from '@/components/ui/Tooltip'
import { FormItem } from '@/components/ui/Form'
import { HiOutlineQuestionMarkCircle } from 'react-icons/hi'
import { Controller } from 'react-hook-form'
import CreatableSelect from 'react-select/creatable'


const ageRestrictions = [
    { label: 'No restriction', value: 'NO_RESTRICTION' },
    { label: '16+', value: 'AGE_16_PLUS' },
    { label: '18+', value: 'AGE_18_PLUS' },
]

const languages = [
    { label: 'English', value: 'en' },
    { label: 'German', value: 'de' },
    { label: 'Russian', value: 'ru' },
]

const eventTypes = [
    { label: 'Concert', value: 'concert' },
    { label: 'Conference', value: 'conference' },
    { label: 'Festival', value: 'festival' },
    { label: 'Party', value: 'party' },
    { label: 'Theater', value: 'theater' },
]

const refundPolicies = [
    { label: 'No Refund', value: 'no_refund' },
    { label: 'Full Refund', value: 'full_refund' },
    { label: 'Partial Refund', value: 'partial_refund' },
    { label: 'Exchange Only', value: 'exchange_only' },
]

const AttributeSection = ({ control, errors }) => {
    return (
        <Card>
            <h4 className="mb-6">Attribute</h4>
            <FormItem
                label="Age Restriction"
                invalid={Boolean(errors.ageRestriction)}
                errorMessage={errors.ageRestriction?.message}
            >
                <Controller
                    name="ageRestriction"
                    control={control}
                    render={({ field }) => (
                        <Select
                            options={ageRestrictions}
                            value={ageRestrictions.filter(
                                (category) => category.value === field.value,
                            )}
                            onChange={(option) => field.onChange(option?.value)}
                        />
                    )}
                />
            </FormItem>
            <FormItem
                label="Event Type"
            >
                <Controller
                    name="eventTypes"
                    control={control}
                    render={({ field }) => (
                        <Select
                            value={field.value}
                            placeholder="Add event type..."
                            componentAs={CreatableSelect}
                            options={eventTypes}
                            onChange={(option) => field.onChange(option)}
                        />
                    )}
                />
            </FormItem>
            <FormItem
                label="Languages"
                extra={
                    <Tooltip
                        title="You add as many languages as you want to a event. This will help users to find events in their preferred language."
                        className="text-center"
                    >
                        <HiOutlineQuestionMarkCircle className="text-base mx-1" />
                    </Tooltip>
                }
            >
                <Controller
                    name="languages"
                    control={control}
                    render={({ field }) => (
                        <Select
                            isMulti
                            isClearable
                            value={field.value}
                            placeholder="Add languages for event..."
                            componentAs={CreatableSelect}
                            options={languages}
                            onChange={(option) => field.onChange(option)}
                        />
                    )}
                />
            </FormItem>
            <FormItem
                label="Refund Policy"
            >
                <Controller
                    name="refundPolicy"
                    control={control}
                    render={({ field }) => (
                        <Select
                            value={field.value}
                            placeholder="Add Refund Policy..."
                            componentAs={CreatableSelect}
                            options={refundPolicies}
                            onChange={(option) => field.onChange(option)}
                        />
                    )}
                />
            </FormItem>
        </Card>
    )
}

export default AttributeSection
