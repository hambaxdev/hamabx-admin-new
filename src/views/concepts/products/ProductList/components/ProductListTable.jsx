import { useMemo, useState } from 'react'
import Avatar from '@/components/ui/Avatar'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import useProductList from '../hooks/useProductList'
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

const ProductColumn = ({ row }) => {
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

const ProductListTable = () => {

    const navigate = useNavigate()

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
    const [toDeleteId, setToDeleteId] = useState('')

    const handleCancel = () => {
        setDeleteConfirmationOpen(false)
    }

    const handleDelete = (product) => {
        setDeleteConfirmationOpen(true)
        setToDeleteId(product.id)
    }

    const handleEdit = (product) => {
        navigate(`/concepts/products/product-edit/${product.id}`)
    }

const handleConfirmDelete = () => {
  const newProductList = productList.filter((product) => product.id !== toDeleteId)

  setSelectAllProduct([])
  mutate(
    (prev) => {
      // если prev ещё не загружен
      if (!prev) return { data: newProductList, total: newProductList.length }
      return { ...prev, data: newProductList, total: newProductList.length }
    },
    false // не рефетчить
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
        setSelectedProduct,
        selectedProduct,
        mutate,
    } = useProductList()

    const columns = useMemo(
  () => [
    {
      header: 'Event',
      accessorKey: 'name',
      cell: (props) => <ProductColumn row={props.row.original} />,
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
  [] // eslint-disable-line
)


    const handleSetTableData = (data) => {
        setTableData(data)
        if (selectedProduct.length > 0) {
            setSelectAllProduct([])
        }
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

    const handleRowSelect = (checked, row) => {
        setSelectedProduct(checked, row)
    }

    const handleAllRowSelect = (checked, rows) => {
        if (checked) {
            const originalRows = rows.map((row) => row.original)
            setSelectAllProduct(originalRows)
        } else {
            setSelectAllProduct([])
        }
    }

    return (
        <>
            <DataTable
                selectable
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
                checkboxChecked={(row) =>
                    selectedProduct.some((selected) => selected.id === row.id)
                }
                onPaginationChange={handlePaginationChange}
                onSelectChange={handleSelectChange}
                onSort={handleSort}
                onCheckBoxChange={handleRowSelect}
                onIndeterminateCheckBoxChange={handleAllRowSelect}
            />
            <ConfirmDialog
                isOpen={deleteConfirmationOpen}
                type="danger"
                title="Remove products"
                onClose={handleCancel}
                onRequestClose={handleCancel}
                onCancel={handleCancel}
                onConfirm={handleConfirmDelete}
            >
                <p>
                    {' '}
                    Are you sure you want to remove this product? This action
                    can&apos;t be undo.{' '}
                </p>
            </ConfirmDialog>
        </>
    )
}

export default ProductListTable
