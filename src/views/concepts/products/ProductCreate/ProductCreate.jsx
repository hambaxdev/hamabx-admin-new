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
import { apiPostProduct } from '@/services/EventService.js'

const ProductCreate = () => {
    const navigate = useNavigate()

    const [discardConfirmationOpen, setDiscardConfirmationOpen] =
        useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)

    const handleFormSubmit = async (values) => {
        console.log('Submitting form with values:', values)
        setIsSubmiting(true)
        try {
            // Картинки из формы -> массив URL-строк
            const imageUrls = (values.imgList || [])
                .map(x => x?.img)
                .filter(Boolean)

            // Есть ли пулы билетов
            const hasPools = Array.isArray(values.ticketPools) && values.ticketPools.length > 0

            // Если нет пулов — берём фикс-прайс
            const amount = !hasPools
                ? (Number.isFinite(Number(values.price)) ? Number(values.price) : null)
                : null

            // Первый язык из массива кодов, по умолчанию EN
            const language = (values.languages?.[0] || 'en').toUpperCase()

            // Маппинг пулов в DTO (если есть)
            const ticketPools = hasPools
                ? values.ticketPools.map(p => ({
                    name: p?.name ?? '',
                    price: Number.isFinite(Number(p?.price)) ? Number(p.price) : 0,
                    startDate: p?.startDate ?? null,
                    endDate: p?.endDate ?? null,
                    limitTickets: Boolean(p?.limitTickets),
                    quantity: p?.limitTickets
                        ? (Number.isFinite(Number(p?.quantity)) ? Number(p.quantity) : 0)
                        : null,
                }))
                : undefined

            const dto = {
                name: values.name,
                description: values.description,
                startDate: values.startDate,
                startTime: values.startTime,
                imageUrls, // используем реальные, без плейсхолдеров
                locationName: values.location,
                country: values.country,
                address: values.address,
                city: values.city,
                postalCode: values.postcode,

                // Коды из формы
                ageRestriction: values.ageRestriction || 'NO_RESTRICTION',
                eventType: (values.eventType || values.eventTypes || 'CONCERT'), // поддержка старого имени
                language,
                refundPolicy: values.refundPolicy || 'NO_REFUND',

                // Цена/тип
                priceType: hasPools ? 'TICKET_POOL' : 'FIXED',
                amount,
                currency: 'EUR',

                organizerId: '00000000-0000-0000-0000-000000000000',

                // Добавляем поле только если есть пулы
                ...(hasPools ? { ticketPools } : {}),
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
        } finally {
            setIsSubmiting(false)
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

                    // 🔽 добавь это
                    ageRestriction: 'NO_RESTRICTION',
                    eventTypes: 'CONCERT',     // (или переименуй поле в eventType)
                    languages: [],             // массив кодов языков
                    refundPolicy: 'NO_REFUND',
                    ticketPools: [],           // для useFieldArray
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
