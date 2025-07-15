import ApiService from './ApiService'

export async function apiGetSettingsProfile() {
    return ApiService.fetchDataWithAxios({
        url: '/auth/profile',
        method: 'get',
    })
}

export async function apiPostSettingsProfile(data) {
    return ApiService.fetchDataWithAxios({
        url: '/auth/profile',
        method: 'post',
        data,
    })
}

export async function apiGetSettingsNotification() {
    return ApiService.fetchDataWithAxios({
        url: '/setting/notification',
        method: 'get',
    })
}

export async function apiGetSettingsBilling() {
    return ApiService.fetchDataWithAxios({
        url: '/setting/billing',
        method: 'get',
    })
}

export async function apiGetSettingsIntergration() {
    return ApiService.fetchDataWithAxios({
        url: '/setting/intergration',
        method: 'get',
    })
}

export async function apiGetRolesPermissionsUsers(params) {
    return ApiService.fetchDataWithAxios({
        url: '/rbac/users',
        method: 'get',
        params,
    })
}

export async function apiGetRolesPermissionsRoles() {
    return ApiService.fetchDataWithAxios({
        url: '/rbac/roles',
        method: 'get',
    })
}

export async function apiGetPricingPlans() {
    return ApiService.fetchDataWithAxios({
        url: '/pricing',
        method: 'get',
    })
}

export async function apiGetPresignedUrl (data) {
    return ApiService.fetchDataWithAxios({
        url: '/auth/s3/upload-url',
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data,
    })
}

export async function apiPostChangePassword(data) {
    return ApiService.fetchDataWithAxios({
        url: '/auth/change-password',
        method: 'post',
        data,
    })
}