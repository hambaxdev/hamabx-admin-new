import { useQuery } from '@tanstack/react-query'
import { apiGetProductFormOptions } from '@/services/ProductService'

const mapToSelect = (items = []) =>
    items.map(({ code, label }) => ({ value: code, label }))

export function useProductFormOptions() {
    console.log('useProductFormOptions called');
    const query = useQuery({
        queryKey: ['product-form-options'],
        queryFn: async () => {
            const payload = await apiGetProductFormOptions() // <<< без { data }
            return {
            ageRestrictions: mapToSelect(payload?.ageRestrictions),
            eventTypes:      mapToSelect(payload?.eventTypes),
            refundPolicies:  mapToSelect(payload?.refundPolicies),
            sourceTypes:     mapToSelect(payload?.sourceTypes),
            }
        },
        staleTime: 1000 * 60 * 60 * 12,
        gcTime: 1000 * 60 * 60 * 24,
        retry: 1,
        })

    return {
        ...query,
        options: query.data ?? {
            ageRestrictions: [],
            eventTypes: [],
            refundPolicies: [],
            sourceTypes: [],
        },
    }
}