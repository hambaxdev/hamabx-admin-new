import { useMemo, useState } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import EventForm from '../EventForm'
import NoProductFound from '@/assets/svg/NoProductFound'
import { apiGetEventById, apiDeleteEvent, apiUpdateEvent } from '@/services/EventService.js'
import { TbTrash, TbArrowNarrowLeft } from 'react-icons/tb'
import { useParams, useNavigate } from 'react-router'
import useSWR from 'swr'

const EventEdit = () => {
    const { id } = useParams()

    const navigate = useNavigate()

    const { data, isLoading, mutate } = useSWR(
        id,
        (eventId) => apiGetEventById(eventId),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
        },
    )

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
    const [conflictOpen, setConflictOpen] = useState(false)

    const [isSubmiting, setIsSubmiting] = useState(false)

    const getDefaultValues = useMemo(() => {
        if (data?.data) {
            const ev = data.data

            const imgList = Array.isArray(ev.imageUrls)
                ? ev.imageUrls.map((url, idx) => ({
                    id: `img-${idx}`,
                    name: url?.split('/').pop() || `Image ${idx + 1}`,
                    img: url,
                }))
                : []

            const hasPools = ev.priceType === 'TICKET_POOL' && Array.isArray(ev.ticketPools)

            return {
                name: ev.name ?? '',
                description: ev.description ?? '',
                price: hasPools ? '' : (ev.amount ?? ''),
                imgList,
                category: '',
                tags: [],
                brand: '',
                startDate: ev.startDate ?? '',
                startTime: ev.startTime ?? '',
                location: ev.locationName ?? '',
                country: ev.country ?? '',
                address: ev.address ?? '',
                city: ev.city ?? '',
                postcode: ev.postalCode ?? '',
                ageRestriction: ev.ageRestriction ?? 'NO_RESTRICTION',
                eventTypes: ev.eventType ?? 'CONCERT',
                languages: ev.language ? [String(ev.language).toLowerCase()] : [],
                refundPolicy: ev.refundPolicy ?? 'NO_REFUND',
                ticketPools: hasPools ? (ev.ticketPools || []) : [],
            }
        }

        return {}
    }, [data])

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

            const etag = data?.etag
            const result = await apiUpdateEvent(id, dto, etag, 'put')

            await mutate(result, { revalidate: false })

            toast.push(<Notification type="success">Changes Saved!</Notification>, {
                placement: 'top-center',
            })
        } catch (error) {
            const status = error?.response?.status
            if (status === 400) {
                toast.push(
                    <Notification type="danger">Validation error. Please check your input.</Notification>,
                    { placement: 'top-center' }
                )
            } else if (status === 403) {
                toast.push(
                    <Notification type="warning">You do not have permission to edit this event.</Notification>,
                    { placement: 'top-center' }
                )
            } else if (status === 404) {
                toast.push(
                    <Notification type="warning">Event not found.</Notification>,
                    { placement: 'top-center' }
                )
            } else if (status === 409) {
                toast.push(
                    <Notification type="warning">Conflict detected. The event has been modified by someone else.</Notification>,
                    { placement: 'top-center' }
                )
                setConflictOpen(true)
            } else {
                toast.push(
                    <Notification type="danger">Failed to save changes. Please try again.</Notification>,
                    { placement: 'top-center' }
                )
            }
        } finally {
            setIsSubmiting(false)
        }
    }

    const handleDelete = () => {
        setDeleteConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDeleteConfirmationOpen(false)
    }

    const handleBack = () => {
        navigate('/concepts/events/event-list')
    }

    const handleConfirmDelete = async () => {
        try {
            await apiDeleteEvent(id)
            toast.push(
                <Notification type="success">Event deleted!</Notification>,
                { placement: 'top-center' },
            )
            navigate('/concepts/events/event-list')
        } finally {
            setDeleteConfirmationOpen(false)
        }
    }

    return (
        <>
            {!isLoading && !data && (
                <div className="h-full flex flex-col items-center justify-center">
                    <NoProductFound height={280} width={280} />
                    <h3 className="mt-8">No event found!</h3>
                </div>
            )}
            {!isLoading && data && (
                <>
                    <EventForm
                        defaultValues={getDefaultValues}
                        newProduct={false}
                        onFormSubmit={handleFormSubmit}
                    >
                        <Container>
                            <div className="flex items-center justify-between px-8">
                                <Button
                                    className="ltr:mr-3 rtl:ml-3"
                                    type="button"
                                    variant="plain"
                                    icon={<TbArrowNarrowLeft />}
                                    onClick={handleBack}
                                >
                                    Back
                                </Button>
                                <div className="flex items-center">
                                    <Button
                                        className="ltr:mr-3 rtl:ml-3"
                                        type="button"
                                        customColorClass={() =>
                                            'border-error ring-1 ring-error text-error hover:border-error hover:ring-error hover:text-error bg-transparent'
                                        }
                                        icon={<TbTrash />}
                                        onClick={handleDelete}
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        variant="solid"
                                        type="submit"
                                        loading={isSubmiting}
                                    >
                                        Save
                                    </Button>
                                </div>
                            </div>
                        </Container>
                    </EventForm>
                    <ConfirmDialog
                        isOpen={deleteConfirmationOpen}
                        type="danger"
                        title="Remove event"
                        onClose={handleCancel}
                        onRequestClose={handleCancel}
                        onCancel={handleCancel}
                        onConfirm={handleConfirmDelete}
                    >
                        <p>
                            Are you sure you want to remove this event? This
                            action can&apos;t be undo.{' '}
                        </p>
                    </ConfirmDialog>

                    <ConfirmDialog
                        isOpen={conflictOpen}
                        type="warning"
                        title="Version conflict"
                        onClose={() => setConflictOpen(false)}
                        onRequestClose={() => setConflictOpen(false)}
                        onCancel={() => setConflictOpen(false)}
                        onConfirm={async () => {
                            try {
                                await mutate(undefined, { revalidate: true })
                            } finally {
                                setConflictOpen(false)
                            }
                        }}
                    >
                        <p>
                            The event has been updated since you opened it. Reload the latest version?
                        </p>
                    </ConfirmDialog>
                </>
            )}
        </>
    )
}

export default EventEdit
