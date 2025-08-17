import Button from '@/components/ui/Button'
import { TbCloudDownload, TbPlus } from 'react-icons/tb'
import { useNavigate } from 'react-router'
import useEventList from '../hooks/useEventList'
import { CSVLink } from 'react-csv'

const EventListActionTools = () => {
    const navigate = useNavigate()

    const { productList } = useEventList()

    return (
        <div className="flex flex-col md:flex-row gap-3">
            <CSVLink filename="event-list.csv" data={productList}>
                <Button icon={<TbCloudDownload className="text-xl" />}>
                    Export
                </Button>
            </CSVLink>
            <Button
                variant="solid"
                icon={<TbPlus className="text-xl" />}
                onClick={() => navigate('/concepts/events/event-create')}
            >
                Add events
            </Button>
        </div>
    )
}

export default EventListActionTools
