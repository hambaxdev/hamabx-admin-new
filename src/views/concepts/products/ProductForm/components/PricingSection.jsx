import { useEffect, useState } from 'react'
import { Controller, useFieldArray } from 'react-hook-form'
import Card from '@/components/ui/Card'
import { FormItem } from '@/components/ui/Form'
import NumericInput from '@/components/shared/NumericInput'
import Switcher from '@/components/ui/Switcher'
import Button from '@/components/ui/Button'
import DatePicker from '@/components/ui/DatePicker'
import Input from '@/components/ui/Input'

const PricingSection = ({ control, errors, watch, setValue }) => {
    const [usePools, setUsePools] = useState(false)

    const { fields, append, remove, replace } = useFieldArray({
        control,
        name: 'ticketPools',
    })

    const handleAddPool = () => {
        append({
            name: '',
            price: '',
            startDate: '',
            endDate: '',
            limitTickets: false,
            quantity: '',
        })
    }

    const handleRemovePool = (index) => {
        if (fields.length > 2) {
            remove(index)
        }
    }

    // Автоматическое добавление 2 пулов при активации свитчера
    useEffect(() => {
        if (usePools && fields.length === 0) {
            replace([
                {
                    name: '',
                    price: '',
                    startDate: '',
                    endDate: '',
                    limitTickets: false,
                    quantity: '',
                },
                {
                    name: '',
                    price: '',
                    startDate: '',
                    endDate: '',
                    limitTickets: false,
                    quantity: '',
                },
            ])
        }
    }, [usePools, fields.length, replace])

    return (
        <Card>
            <h4 className="mb-6">Ticket pricing</h4>

            {/* Свитчер использования пулов */}
            <div className="flex items-center justify-between mb-4">
                <span>Использовать пулы билетов</span>
                <Switcher
                    checked={usePools}
                    onChange={(val) => setUsePools(val)}
                />
            </div>

            {!usePools && (
                <FormItem
                    label="Цена билета"
                    invalid={Boolean(errors.price)}
                    errorMessage={errors.price?.message}
                >
                    <Controller
                        name="price"
                        control={control}
                        render={({ field }) => (
                            <NumericInput
                                thousandSeparator
                                type="text"
                                inputPrefix="€"
                                autoComplete="off"
                                placeholder="0.00"
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                </FormItem>
            )}

            {usePools && (
                <div className="space-y-4">
                    {fields.map((item, index) => (
                        <Card key={item.id} className="p-4 relative">
                            <div className="flex justify-between items-center mb-2">
                                <h5>Pool {index + 1}</h5>
                                {fields.length > 2 && (
                                    <Button
                                        size="sm"
                                        variant="text"
                                        onClick={() => handleRemovePool(index)}
                                    >
                                        Удалить
                                    </Button>
                                )}
                            </div>

                            <FormItem
                                label="Имя пула"
                                invalid={Boolean(errors?.ticketPools?.[index]?.name)}
                                errorMessage={errors?.ticketPools?.[index]?.name?.message}
                            >
                                <Controller
                                    name={`ticketPools.${index}.name`}
                                    control={control}
                                    render={({ field }) => (
                                        <Input placeholder="Название пула" {...field} />
                                    )}
                                />
                            </FormItem>

                            <FormItem
                                label="Цена"
                                invalid={Boolean(errors?.ticketPools?.[index]?.price)}
                                errorMessage={errors?.ticketPools?.[index]?.price?.message}
                            >
                                <Controller
                                    name={`ticketPools.${index}.price`}
                                    control={control}
                                    render={({ field }) => (
                                        <NumericInput
                                            thousandSeparator
                                            type="text"
                                            inputPrefix="€"
                                            autoComplete="off"
                                            placeholder="0.00"
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    )}
                                />
                            </FormItem>

                            <div className="flex gap-4">
                                <FormItem
                                    label="Начало"
                                    invalid={Boolean(errors?.ticketPools?.[index]?.startDate)}
                                    errorMessage={errors?.ticketPools?.[index]?.startDate?.message}
                                >
                                    <Controller
                                        name={`ticketPools.${index}.startDate`}
                                        control={control}
                                        render={({ field }) => (
                                            <DatePicker
                                                selected={field.value}
                                                onChange={field.onChange}
                                                placeholderText="TT.MM.JJJJ"
                                            />
                                        )}
                                    />
                                </FormItem>

                                <FormItem
                                    label="Окончание"
                                    invalid={Boolean(errors?.ticketPools?.[index]?.endDate)}
                                    errorMessage={errors?.ticketPools?.[index]?.endDate?.message}
                                >
                                    <Controller
                                        name={`ticketPools.${index}.endDate`}
                                        control={control}
                                        render={({ field }) => (
                                            <DatePicker
                                                selected={field.value}
                                                onChange={field.onChange}
                                                placeholderText="TT.MM.JJJJ"
                                            />
                                        )}
                                    />
                                </FormItem>
                            </div>

                            <div className="flex items-center justify-between mt-2">
                                <span>Ограничить количество</span>
                                <Controller
                                    name={`ticketPools.${index}.limitTickets`}
                                    control={control}
                                    render={({ field }) => (
                                        <Switcher
                                            checked={field.value}
                                            onChange={(val) => {
                                                field.onChange(val)
                                                if (!val) {
                                                    setValue(`ticketPools.${index}.quantity`, '')
                                                }
                                            }}
                                        />
                                    )}
                                />
                            </div>

                            {watch(`ticketPools.${index}.limitTickets`) && (
                                <FormItem
                                    label="Количество"
                                    invalid={Boolean(errors?.ticketPools?.[index]?.quantity)}
                                    errorMessage={errors?.ticketPools?.[index]?.quantity?.message}
                                >
                                    <Controller
                                        name={`ticketPools.${index}.quantity`}
                                        control={control}
                                        render={({ field }) => (
                                            <NumericInput
                                                type="number"
                                                min={1}
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                </FormItem>
                            )}
                        </Card>
                    ))}

                    <Button variant="solid" onClick={handleAddPool} type="button">
                        Добавить пул
                    </Button>
                </div>
            )}
        </Card>
    )
}

export default PricingSection
