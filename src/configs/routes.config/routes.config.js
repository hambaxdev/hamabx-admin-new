import dashboardsRoute from './dashboardsRoute'
import conceptsRoute from './conceptsRoute'
import uiComponentsRoute from './uiComponentsRoute'
import authRoute from './authRoute'
import authDemoRoute from './authDemoRoute'
import guideRoute from './guideRoute'
import othersRoute from './othersRoute'
import completeRegistrationRoute from './completeRegistrationRoute'

export const publicRoutes = [...authRoute]

export const protectedRoutes = [
    ...dashboardsRoute,
    ...conceptsRoute,
    ...uiComponentsRoute,
    ...authDemoRoute,
    ...guideRoute,
    ...othersRoute,
    ...completeRegistrationRoute,
]
