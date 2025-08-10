import { useState } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ProductForm from '../ProductForm'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import sleep from '@/utils/sleep'
import { TbTrash } from 'react-icons/tb'
import { useNavigate } from 'react-router'
import { apiPostProduct } from '@/services/ProductService'

const ProductCreate = () => {
    const navigate = useNavigate()

    const [discardConfirmationOpen, setDiscardConfirmationOpen] =
        useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)

    const handleFormSubmit = async (values) => {
        console.log('Submitting form with values:', values)
        try {
            // Преобразуем imgList в imageUrls
            const imageUrls = values.imgList.map((img) => img.img)

            // Преобразуем язык, тип, возврат, если выбраны через Select
            const dto = {
                name: values.name,
                description: values.description,
                startDate: values.startDate,
                startTime: values.startTime,
                imageUrls: [
                    'https://hambax.com/uploads/placeholder-1.jpg',
                    'https://hambax.com/uploads/placeholder-2.jpg'
                ],
                locationName: values.location,
                country: values.country,
                address: values.address,
                city: values.city,
                postalCode: values.postcode,
                ageRestriction: values.ageRestriction || 'NO_RESTRICTION',
                eventType: values.eventTypes?.value?.toUpperCase() || 'CONCERT',
                language: values.languages?.[0]?.value?.toUpperCase?.() || 'EN',
                refundPolicy: values.refundPolicy?.value?.toUpperCase?.() || 'NO_REFUND',
                priceType: values.ticketPools?.length ? 'TICKET_POOL' : 'FIXED',
                amount: !values.ticketPools?.length ? parseFloat(values.price) : null,
                currency: 'EUR',
                organizerId: '00000000-0000-0000-0000-000000000000'
            }

            console.log('DTO отправляется на API:', dto)

            await apiPostProduct(dto)

            toast.push(
                <Notification type="success">Event created!</Notification>,
                { placement: 'top-center' }
            )
            navigate('/concepts/products/product-list')
        } catch (error) {
            console.error('Ошибка при создании:', error)
            toast.push(
                <Notification type="danger">
                    Failed to create event. Please try again.
                </Notification>,
                { placement: 'top-center' }
            )
        }
    }


    const handleConfirmDiscard = () => {
        setDiscardConfirmationOpen(true)
        toast.push(
            <Notification type="success">Event discardd!</Notification>,
            { placement: 'top-center' },
        )
        navigate('/concepts/products/product-list')
    }

    const handleDiscard = () => {
        setDiscardConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDiscardConfirmationOpen(false)
    }

    return (
        <>
            <ProductForm
                newProduct
                defaultValues={{
                name: '',
                description: '',
                productCode: '',
                taxRate: 0,
                price: '',
                bulkDiscountPrice: '',
                costPerItem: '',
                imgList: [],
                category: '',
                tags: [],
                brand: '',
                startDate: '',
                startTime: '',
                location: '',
                country: '',
                address: '',
                city: '',
                postcode: '',
            }}
                onFormSubmit={handleFormSubmit}
            >
                <Container>
                    <div className="flex items-center justify-between px-8">
                        <span></span>
                        <div className="flex items-center">
                            <Button
                                className="ltr:mr-3 rtl:ml-3"
                                type="button"
                                customColorClass={() =>
                                    'border-error ring-1 ring-error text-error hover:border-error hover:ring-error hover:text-error bg-transparent'
                                }
                                icon={<TbTrash />}
                                onClick={handleDiscard}
                            >
                                Discard
                            </Button>
                            <Button
                                variant="solid"
                                type="submit"
                                loading={isSubmiting}
                            >
                                Create
                            </Button>
                        </div>
                    </div>
                </Container>
            </ProductForm>
            <ConfirmDialog
                isOpen={discardConfirmationOpen}
                type="danger"
                title="Discard changes"
                onClose={handleCancel}
                onRequestClose={handleCancel}
                onCancel={handleCancel}
                onConfirm={handleConfirmDiscard}
            >
                <p>
                    Are you sure you want discard this? This action can&apos;t
                    be undo.{' '}
                </p>
            </ConfirmDialog>
        </>
    )
}

export default ProductCreate
