import { useState } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import EventForm from '../EventForm'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { TbTrash } from 'react-icons/tb'
import { useNavigate } from 'react-router'
import { apiPostProduct } from '@/services/ProductService'

const EventCreate = () => {
    const navigate = useNavigate()

    const [discardConfirmationOpen, setDiscardConfirmationOpen] = useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)

    const handleFormSubmit = async (values) => {
        setIsSubmiting(true)
        try {
            const imageUrls = (values.imgList || [])
                .map(x => x?.img)
                .filter(Boolean)

            const hasPools = Array.isArray(values.ticketPools) && values.ticketPools.length > 0

            const amount = !hasPools
                ? (Number.isFinite(Number(values.price)) ? Number(values.price) : null)
                : null

            const language = (values.languages?.[0] || 'en').toUpperCase()

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
                imageUrls,
                locationName: values.location,
                country: values.country,
                address: values.address,
                city: values.city,
                postalCode: values.postcode,

                ageRestriction: values.ageRestriction || 'NO_RESTRICTION',
                eventType: (values.eventType || values.eventTypes || 'CONCERT'),
                language,
                refundPolicy: values.refundPolicy || 'NO_REFUND',

                priceType: hasPools ? 'TICKET_POOL' : 'FIXED',
                amount,
                currency: 'EUR',

                organizerId: '00000000-0000-0000-0000-000000000000',
                ...(hasPools ? { ticketPools } : {}),
            }

            await apiPostProduct(dto)

            toast.push(
                <Notification type="success">Event created!</Notification>,
                { placement: 'top-center' }
            )
            navigate('/concepts/events/event-list')
        } catch (error) {
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
            <Notification type="success">Event discarded!</Notification>,
            { placement: 'top-center' },
        )
        navigate('/concepts/events/event-list')
    }

    const handleDiscard = () => {
        setDiscardConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDiscardConfirmationOpen(false)
    }

    return (
        <>
            <EventForm
                newProduct
                defaultValues={{
                    name: '',
                    description: '',
                    price: '',
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
                    ageRestriction: 'NO_RESTRICTION',
                    eventTypes: 'CONCERT',
                    languages: [],
                    refundPolicy: 'NO_REFUND',
                    ticketPools: [],
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
            </EventForm>
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
                    Are you sure you want discard this? This action can't
                    be undo.{' '}
                </p>
            </ConfirmDialog>
        </>
    )
}

export default EventCreate
