import { lazy } from 'react'

const CompleteRegistration = lazy(() => import('@/views/auth/CompleteRegistration'))

const completeRegistrationRoute = [
    {
        key: 'completeRegistration',
        path: '/complete-registration',
        component: CompleteRegistration,
        authority: [],
    },
]

export default completeRegistrationRoute
