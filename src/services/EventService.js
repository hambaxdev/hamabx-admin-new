import ApiService from './ApiService'
import AxiosBase from './axios/AxiosBase'

export async function apiGetProductList() {
  const res = await ApiService.fetchDataWithAxios({
    url: '/event/api/v1/events/my-events',
    method: 'get',
  })
  return res?.data ?? res
}

// Fetch single event by id and return both data and ETag
export async function apiGetEventById(id) {
    const res = await AxiosBase({
        url: `/event/api/v1/events/${id}`,
        method: 'get',
    })
    const etag = res.headers?.etag || res.headers?.ETag || res.headers?.ETAG
    return { data: res.data, etag }
}

export async function apiPostProduct(params) {
    return ApiService.fetchDataWithAxios({
        url: `/event/api/v1/events`,
        method: 'post',
        data: params,
    })
}

// Update event (PUT by default). Includes If-Match header with latest ETag
export async function apiUpdateEvent(id, params, etag, method = 'put') {
    const res = await AxiosBase({
        url: `/event/api/v1/events/${id}`,
        method,
        data: params,
        headers: {
            ...(etag ? { 'If-Match': etag } : {}),
        },
    })
    const newEtag = res.headers?.etag || res.headers?.ETag || res.headers?.ETAG
    return { data: res.data, etag: newEtag }
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