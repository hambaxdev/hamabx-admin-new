import Card from '@/components/ui/Card'
import Select from '@/components/ui/Select'
import Tooltip from '@/components/ui/Tooltip'
import { FormItem } from '@/components/ui/Form'
import { HiOutlineQuestionMarkCircle } from 'react-icons/hi'
import { Controller } from 'react-hook-form'
import CreatableSelect from 'react-select/creatable'
import { useProductFormOptions } from '@/utils/hooks/useProductFormOptions'

const languageOptions = [
    { label: 'English', value: 'en' },
    { label: 'German', value: 'de' },
    { label: 'Russian', value: 'ru' },
]

const AttributeSection = ({ control, errors }) => {
    const { options, isLoading, isError } = useProductFormOptions()

    const isDisabled = isLoading || isError

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
                            isDisabled={isDisabled}
                            options={options.ageRestrictions}
                            value={options.ageRestrictions.find(o => o.value === field.value) || null}
                            onChange={(opt) => field.onChange(opt?.value ?? null)}
                        />
                    )}
                />
            </FormItem>

            <FormItem label="Event Type">
                <Controller
                    name="eventTypes"
                    control={control}
                    render={({ field }) => {
                        const isMulti = false
                        const resolveValue = () => {
                            if (isMulti) {
                                return options.eventTypes.filter(o => (field.value || []).includes(o.value))
                            }
                            return options.eventTypes.find(o => o.value === field.value) || null
                        }
                        const handleChange = (opt) => {
                            if (isMulti) {
                                field.onChange((opt || []).map(o => o.value))
                            } else {
                                field.onChange(opt?.value ?? null)
                            }
                        }

                        return (
                            <Select
                                isDisabled={isDisabled}
                                isMulti={isMulti}
                                value={resolveValue()}
                                placeholder="Add event type..."
                                componentAs={CreatableSelect}
                                options={options.eventTypes}
                                onChange={handleChange}
                            />
                        )
                    }}
                />
            </FormItem>

            <FormItem
                label="Languages"
                extra={
                    <Tooltip
                        title="You can add as many languages as you want. It helps discoverability."
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
                            value={languageOptions.filter(o => (field.value || []).includes(o.value))}
                            placeholder="Add languages for event..."
                            componentAs={CreatableSelect}
                            options={languageOptions}
                            onChange={(opts) => field.onChange((opts || []).map(o => o.value))}
                        />
                    )}
                />
            </FormItem>

            <FormItem label="Refund Policy">
                <Controller
                    name="refundPolicy"
                    control={control}
                    render={({ field }) => (
                        <Select
                            isDisabled={isDisabled}
                            value={options.refundPolicies.find(o => o.value === field.value) || null}
                            placeholder="Add Refund Policy..."
                            componentAs={CreatableSelect}
                            options={options.refundPolicies}
                            onChange={(opt) => field.onChange(opt?.value ?? null)}
                        />
                    )}
                />
            </FormItem>
        </Card>
    )
}

export default AttributeSection
