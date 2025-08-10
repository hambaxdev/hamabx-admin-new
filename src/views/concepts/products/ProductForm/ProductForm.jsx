import { useEffect } from 'react'
import { Form } from '@/components/ui/Form'
import Container from '@/components/shared/Container'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import GeneralSection from './components/GeneralSection'
import PricingSection from './components/PricingSection'
import ImageSection from './components/ImageSection'
import AttributeSection from './components/AttributeSection'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import isEmpty from 'lodash/isEmpty'
import AddressSection from './components/CustomAddressSection'

const validationSchema = z.object({
    name: z.string().min(1, { message: 'Event name required!' }),
    description: z.string().min(1, { message: 'Produc description required!' }),
    price: z.union([z.string(), z.number()], {
        errorMap: () => ({ message: 'Price required!' }),
    }),
    imgList: z
        .array(
            z.object({
                id: z.string(),
                name: z.string(),
                img: z.string(),
            }),
        )
        .min(1, { message: 'At least 1 image required!' }),
})

const ProductForm = (props) => {
    const {
        onFormSubmit,
        defaultValues = {
            imgList: [],
        },
        children,
    } = props

    const {
        handleSubmit,
        reset,
        formState: { errors },
        control,
        watch,
        setValue
    } = useForm({
        defaultValues: {
            ...defaultValues,
        },
        resolver: zodResolver(validationSchema),
    })

    useEffect(() => {
        if (!isEmpty(defaultValues)) {
            reset(defaultValues)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(defaultValues)])

    const onSubmit = (values) => {
        console.log('Form submitted with values:', values)
        onFormSubmit?.(values)
    }

    return (
        <Form
            className="flex w-full h-full"
            containerClassName="flex flex-col w-full justify-between"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Container>
                <div className="flex flex-col xl:flex-row gap-4">
                    <div className="gap-4 flex flex-col flex-auto">
                        <GeneralSection control={control} errors={errors} />
                        <AddressSection control={control} errors={errors} />
                        <PricingSection control={control} errors={errors} watch={watch} setValue={setValue} />
                    </div>
                    <div className="lg:min-w-[440px] 2xl:w-[500px] gap-4 flex flex-col">
                        <ImageSection control={control} errors={errors} />
                        <AttributeSection control={control} errors={errors} />
                    </div>
                </div>
            </Container>
            <BottomStickyBar>{children}</BottomStickyBar>
        </Form>
    )
}

export default ProductForm
