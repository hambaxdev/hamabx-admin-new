import ApiService from './ApiService'

export async function apiCompleteRegistration(data) {
    return ApiService.fetchDataWithAxios({
        url: '/auth/complete',
        method: 'post',
        data,
    })
}
