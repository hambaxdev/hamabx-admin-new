import EventListSearch from './EventListSearch'
import EventTableFilter from './EventTableFilter'
import useEventList from '../hooks/useEventList'
import cloneDeep from 'lodash/cloneDeep'

const EventListTableTools = () => {
    const { tableData, setTableData } = useEventList()

    const handleInputChange = (val) => {
        const newTableData = cloneDeep(tableData)
        newTableData.query = val
        newTableData.pageIndex = 1
        if (typeof val === 'string' && val.length > 1) {
            setTableData(newTableData)
        }

        if (typeof val === 'string' && val.length === 0) {
            setTableData(newTableData)
        }
    }

    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <EventListSearch onInputChange={handleInputChange} />
            <EventTableFilter />
        </div>
    )
}

export default EventListTableTools
