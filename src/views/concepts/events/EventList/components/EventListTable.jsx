import { useMemo, useState } from 'react'
import Avatar from '@/components/ui/Avatar'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import useEventList from '../hooks/useEventList'
import cloneDeep from 'lodash/cloneDeep'
import { useNavigate } from 'react-router'
import { TbPencil, TbTrash } from 'react-icons/tb'
import { FiPackage } from 'react-icons/fi'
import { NumericFormat } from 'react-number-format'

// Helper to format dates as dd.mm.YYYY
const formatDateRu = (value) => {
    if (!value) return '—'
    try {
        if (typeof value === 'string') {
            const m = value.match(/^(\d{4})-(\d{2})-(\d{2})/)
            if (m) {
                const [, yyyy, mm, dd] = m
                return `${dd}.${mm}.${yyyy}`
            }
        }
        const d = new Date(value)
        if (Number.isNaN(d.getTime())) return String(value)
        const dd = String(d.getDate()).padStart(2, '0')
        const mm = String(d.getMonth() + 1).padStart(2, '0')
        const yyyy = String(d.getFullYear())
        return `${dd}.${mm}.${yyyy}`
    } catch {
        return String(value)
    }
}

const EventColumn = ({ row }) => {
    return (
        <div className="flex items-center gap-2">
            <Avatar
                shape="round"
                size={60}
                {...(row.img ? { src: row.img } : { icon: <FiPackage /> })}
            />
            <div>
                <div className="font-bold heading-text mb-1">{row.name}</div>
                <span>ID: {row.id}</span>
            </div>
        </div>
    )
}

const ActionColumn = ({ onEdit, onDelete }) => {
    return (
        <div className="flex items-center justify-end gap-3">
            <Tooltip title="Edit">
                <div
                    className={`text-xl cursor-pointer select-none font-semibold`}
                    role="button"
                    onClick={onEdit}
                >
                    <TbPencil />
                </div>
            </Tooltip>
            <Tooltip title="Delete">
                <div
                    className={`text-xl cursor-pointer select-none font-semibold`}
                    role="button"
                    onClick={onDelete}
                >
                    <TbTrash />
                </div>
            </Tooltip>
        </div>
    )
}

const EventListTable = () => {

    const navigate = useNavigate()

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
    const [toDeleteId, setToDeleteId] = useState('')

    const handleCancel = () => {
        setDeleteConfirmationOpen(false)
    }

    const handleDelete = (row) => {
        setDeleteConfirmationOpen(true)
        setToDeleteId(row.id)
    }

    const handleEdit = (row) => {
        navigate(`/concepts/events/event-edit/${row.id}`)
    }

    const handleConfirmDelete = () => {
      const newProductList = productList.filter((product) => product.id !== toDeleteId)

      setSelectAllProduct([])
      mutate(
        (prev) => {
          if (!prev) return { data: newProductList, total: newProductList.length }
          return { ...prev, data: newProductList, total: newProductList.length }
        },
        false
      )
      setDeleteConfirmationOpen(false)
      setToDeleteId('')
    }

    const {
        productList,
        productListTotal,
        tableData,
        isLoading,
        setTableData,
        setSelectAllProduct,
        mutate,
    } = useEventList()

    const columns = useMemo(
  () => [
    {
      header: 'Event',
      accessorKey: 'name',
      cell: (props) => <EventColumn row={props.row.original} />,
    },
    {
      header: 'When',
      id: 'when',
      cell: (props) => {
        const { startDate, startTime } = props.row.original
        const formattedDate = formatDateRu(startDate)
        return (
          <div className="leading-tight">
            <div className="font-semibold">{formattedDate}</div>
            <div className="text-xs opacity-70">{startTime || ''}</div>
          </div>
        )
      },
    },
    {
      header: 'Location',
      id: 'location',
      cell: (props) => {
        const { locationName, city, country } = props.row.original
        return (
          <div className="leading-tight">
            <div className="font-semibold">{locationName || city || '—'}</div>
            <div className="text-xs opacity-70">
              {[city, country].filter(Boolean).join(', ')}
            </div>
          </div>
        )
      },
    },
    {
      header: 'Price',
      accessorKey: 'price',
      cell: (props) => {
        const { price, currency } = props.row.original
        if (price == null) return <span className="opacity-60">—</span>
        const prefix = currency === 'EUR' ? '€' : ''
        return (
          <span className="font-bold heading-text">
            <NumericFormat
              fixedDecimalScale
              prefix={prefix}
              displayType="text"
              value={price}
              decimalScale={2}
              thousandSeparator
            />
          </span>
        )
      },
    },
    {
      header: 'Type',
      id: 'eventType',
      cell: (props) => {
        const { eventType, ageRestriction } = props.row.original
        return (
          <div className="leading-tight">
            <div className="font-semibold">{eventType || '—'}</div>
            <div className="text-xs opacity-70">{ageRestriction || ''}</div>
          </div>
        )
      },
    },
    {
      header: '',
      id: 'action',
      cell: (props) => (
        <ActionColumn
          onEdit={() => handleEdit(props.row.original)}
          onDelete={() => handleDelete(props.row.original)}
        />
      ),
    },
  ],
  []
)


    const handleSetTableData = (data) => {
        setTableData(data)
    }

    const handlePaginationChange = (page) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        handleSetTableData(newTableData)
    }

    const handleSelectChange = (value) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        handleSetTableData(newTableData)
    }

    const handleSort = (sort) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        handleSetTableData(newTableData)
    }

    return (
        <>
            <DataTable
                columns={columns}
                data={productList}
                noData={!isLoading && productList.length === 0}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ width: 28, height: 28 }}
                loading={isLoading}
                pagingData={{
                    total: productListTotal,
                    pageIndex: tableData.pageIndex,
                    pageSize: tableData.pageSize,
                }}
                onPaginationChange={handlePaginationChange}
                onSelectChange={handleSelectChange}
                onSort={handleSort}
            />
            <ConfirmDialog
                isOpen={deleteConfirmationOpen}
                type="danger"
                title="Remove events"
                onClose={handleCancel}
                onRequestClose={handleCancel}
                onCancel={handleCancel}
                onConfirm={handleConfirmDelete}
            >
                <p>
                    {' '}
                    Are you sure you want to remove this event? This action
                    can&apos;t be undo.{' '}
                </p>
            </ConfirmDialog>
        </>
    )
}

export default EventListTable
