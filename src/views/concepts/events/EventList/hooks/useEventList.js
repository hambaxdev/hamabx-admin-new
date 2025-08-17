import { apiGetProductList } from '@/services/EventService.js'
import useSWR from 'swr'
import { useEventListStore } from '../store/eventListStore'

// Map event object to table row
const mapEventToRow = (e) => {
  const minTier = Array.isArray(e.prices) && e.prices.length
    ? Math.min(
        ...e.prices
          .map((p) => Number(p.amount))
          .filter((n) => Number.isFinite(n))
      )
    : null

  const price =
    e.priceType === 'FIXED'
      ? (Number.isFinite(Number(e.amount)) ? Number(e.amount) : null)
      : (Number.isFinite(minTier) ? minTier : null)

  const img =
    (e.imageUrls || []).find((u) => u && !String(u).startsWith('blob:')) ||
    (e.imageUrls ? e.imageUrls[0] : undefined) ||
    undefined

  return {
    id: e.eventId,
    name: e.name,
    img,
    price,
    currency: e.currency || 'EUR',
    startDate: e.startDate,
    startTime: e.startTime,
    locationName: e.locationName,
    city: e.city,
    country: e.country,
    eventType: e.eventType,
    ageRestriction: e.ageRestriction,
    refundPolicy: e.refundPolicy,
  }
}

const extractList = (res) => {
  if (Array.isArray(res)) return res
  if (Array.isArray(res?.data)) return res.data
  if (Array.isArray(res?.items)) return res.items
  return []
}

const useEventList = () => {
  const {
    tableData,
    filterData,
    setTableData,
    setFilterData,
    selectedProduct,
    setSelectedProduct,
    setSelectAllProduct,
  } = useEventListStore((state) => state)

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    ['/event/api/v1/events/my-events', tableData, filterData],
    () => apiGetProductList(),
    { revalidateOnFocus: false }
  )

  const rawList = extractList(data)
  const productList = rawList.map(mapEventToRow)
  const productListTotal =
    typeof data?.total === 'number' ? data.total : productList.length

  const loading = (isLoading ?? (!data && !error)) || isValidating

  return {
    error,
    isLoading: loading,
    tableData,
    filterData,
    mutate,
    productList,
    productListTotal,
    setTableData,
    selectedProduct,
    setSelectedProduct,
    setSelectAllProduct,
    setFilterData,
  }
}

export default useEventList
