import ApiService from './ApiService'

export async function apiGetProductList(params) {
    return ApiService.fetchDataWithAxios({
        url: '/products',
        method: 'get',
        params,
    })
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
