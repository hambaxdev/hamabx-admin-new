import { BrowserRouter } from 'react-router'
import Theme from '@/components/template/Theme'
import Layout from '@/components/layouts'
import { AuthProvider } from '@/auth'
import Views from '@/views'
import appConfig from './configs/app.config'
import './locales'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

if (appConfig.enableMock) {
    import('./mock')
}

// один экземпляр клиента
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 5,
        },
    },
})

function App() {
    return (
        <Theme>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <AuthProvider>
                        <Layout>
                            <Views />
                        </Layout>
                    </AuthProvider>
                </BrowserRouter>
            </QueryClientProvider>
        </Theme>
    )
}

export default App
