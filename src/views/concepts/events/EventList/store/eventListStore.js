import { create } from 'zustand'

export const initialTableData = {
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

export const initialFilterData = {
    minAmount: 0,
    maxAmount: 5000,
    eventStatus: 'published',
    eventType: ['Concert', 'Conference', 'Meetup', 'Workshop'],
}

const initialState = {
    tableData: initialTableData,
    filterData: initialFilterData,
    selectedProduct: [],
}

export const useEventListStore = create((set) => ({
    ...initialState,
    setFilterData: (payload) => set(() => ({ filterData: payload })),
    setTableData: (payload) => set(() => ({ tableData: payload })),
    setSelectedProduct: (checked, row) =>
        set((state) => {
            const prevData = state.selectedProduct
            if (checked) {
                return { selectedProduct: [...prevData, ...[row]] }
            } else {
                if (prevData.some((prevProduct) => row.id === prevProduct.id)) {
                    return {
                        selectedProduct: prevData.filter(
                            (prevProduct) => prevProduct.id !== row.id,
                        ),
                    }
                }
                return { selectedProduct: prevData }
            }
        }),
    setSelectAllProduct: (row) => set(() => ({ selectedProduct: row })),
}))
