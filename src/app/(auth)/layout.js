import Link from 'next/link'
import ApplicationLogo from '@/components/ApplicationLogo'

export const metadata = {
    title: 'FindMyPet',
}

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center font-sans bg-gray-900 text-white">
            <div>
                <Link href="/">
                    <ApplicationLogo />
                </Link>
            </div>

            <div className="w-full max-w-md mt-6 px-6 py-4 bg-gray-800 overflow-hidden rounded-lg">
                {children}
            </div>
        </div>
    )
}

export default Layout
