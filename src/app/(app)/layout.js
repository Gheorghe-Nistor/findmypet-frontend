'use client'

import { useAuth } from '@/hooks/auth'
import Navigation from '@/app/(app)/Navigation'
import Loading from '@/app/(app)/Loading'

const AppLayout = ({ children }) => {
    const { user } = useAuth({ middleware: 'auth' })

    if (!user) {
        return <Loading />
    }

    return (
        <div className="min-h-screen bg-gray-900">
            <Navigation user={user} />
            <main>
                <div className="py-10">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-white bg-gray-600">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default AppLayout
