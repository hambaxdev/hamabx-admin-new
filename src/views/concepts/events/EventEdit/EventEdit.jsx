import { useState } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import EventForm from '../EventForm'
import NoProductFound from '@/assets/svg/NoProductFound'
import { apiGetProduct } from '@/services/ProductService'
import { TbTrash, TbArrowNarrowLeft } from 'react-icons/tb'
import { useParams, useNavigate } from 'react-router'
import useSWR from 'swr'

const EventEdit = () => {
    const { id } = useParams()

    const navigate = useNavigate()

    const { data, isLoading } = useSWR(
        [`/api/product/${id}`, { id: id }],
        ([_, params]) => apiGetProduct(params),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
        },
    )

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)

    const [isSubmiting, setIsSubmiting] = useState(false)

    const getDefaultValues = () => {
        if (data) {
            const {
                name,
                description,
                productCode,
                taxRate,
                price,
                bulkDiscountPrice,
                costPerItem,
                imgList,
                category,
                brand,
            } = data

            return {
                name,
                description,
                productCode,
                taxRate,
                price,
                bulkDiscountPrice,
                costPerItem,
                imgList,
                category,
                tags: [{ label: 'trend', value: 'trend' }],
                brand,
            }
        }

        return {}
    }

    const handleFormSubmit = async (values) => {
        setIsSubmiting(true)
        setIsSubmiting(false)
        toast.push(<Notification type="success">Changes Saved!</Notification>, {
            placement: 'top-center',
        })
        navigate('/concepts/events/event-list')
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

    const handleConfirmDelete = () => {
        setDeleteConfirmationOpen(true)
        toast.push(
            <Notification type="success">Event deleted!</Notification>,
            { placement: 'top-center' },
        )
        navigate('/concepts/events/event-list')
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
                        defaultValues={getDefaultValues()}
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
                </>
            )}
        </>
    )
}

export default EventEdit
