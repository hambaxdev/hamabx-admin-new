const appConfig = {
    apiPrefix: import.meta.env.VITE_API_URL,
    authenticatedEntryPath: '/dashboards/ecommerce',
    unAuthenticatedEntryPath: '/sign-in',
    locale: 'en',
    accessTokenPersistStrategy: 'localStorage',
    enableMock: false,
    activeNavTranslation: true,
}

export default appConfig
