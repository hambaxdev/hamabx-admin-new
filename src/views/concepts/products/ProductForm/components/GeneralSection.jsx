import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import RichTextEditor from '@/components/shared/RichTextEditor'
import { Controller } from 'react-hook-form'

const GeneralSection = ({ control, errors }) => {
    return (
        <Card>
            <h4 className="mb-6">Basic Information</h4>
            <div>
                <FormItem
                    label="Event name"
                    invalid={Boolean(errors.name)}
                    errorMessage={errors.name?.message}
                >
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="text"
                                autoComplete="off"
                                placeholder="Event Name"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
            </div>
            <FormItem
                label="Description"
                invalid={Boolean(errors.description)}
                errorMessage={errors.description?.message}
            >
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <RichTextEditor
                            content={field.value}
                            invalid={Boolean(errors.description)}
                            onChange={({ html }) => {
                                field.onChange(html)
                            }}
                        />
                    )}
                />
            </FormItem>
            <div className="flex gap-4">
                <FormItem
                    label="Event start date"
                    invalid={Boolean(errors.startDate)}
                    errorMessage={errors.startDate?.message}
                    className="flex-1"
                >
                    <Controller
                        name="startDate"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="date"
                                autoComplete="off"
                                placeholder="Event Start Date"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Event start time"
                    invalid={Boolean(errors.startTime)}
                    errorMessage={errors.startTime?.message}
                    className="flex-1"
                >
                    <Controller
                        name="startTime"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="time"
                                autoComplete="off"
                                placeholder="Event Start Time"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
            </div>
        </Card>
    )
}

export default GeneralSection
