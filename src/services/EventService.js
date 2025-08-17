import ApiService from './ApiService'

export async function apiGetProductList() {
  const res = await ApiService.fetchDataWithAxios({
    url: '/event/api/v1/events/my-events',
    method: 'get',
  })
  return res?.data ?? res
}

export async function apiGetProduct({ id, ...params }) {
    return ApiService.fetchDataWithAxios({
        url: `/products/${id}`,
        method: 'get',
        params,
    })
}

export async function apiPostProduct({ id, ...params }) {
    return ApiService.fetchDataWithAxios({
        url: `/event/api/v1/events`,
        method: 'post',
        data: params,
    })
}

export async function apiDeleteEvent(id) {
    return ApiService.fetchDataWithAxios({
        url: `/event/api/v1/events/${id}`,
        method: 'delete',
    })
}

export async function apiGetProductFormOptions() {
    const res = await ApiService.fetchDataWithAxios({
        url: '/event/api/enums/product-form-options',
        method: 'get',
    })
    return res?.data ?? res
}