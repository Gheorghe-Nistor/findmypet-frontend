import '@/app/global.css'

export const metadata = {
    title: 'FindMyPet',
}
const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <body className="font-sans bg-gray-900 text-white">{children}</body>
        </html>
    )
}

export default RootLayout
