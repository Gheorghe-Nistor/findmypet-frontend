import Link from 'next/link'

const ResponsiveNavLink = ({ active = false, children, ...props }) => (
    <Link
        {...props}
        className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium leading-5 focus:outline-none transition duration-150 ease-in-out ${
            active
                ? 'border-blue-400 text-blue-700 bg-indigo-50 focus:text-blue-800 focus:bg-indigo-100 focus:border-blue-700'
                : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300'
        }`}>
        {children}
    </Link>
)

export default ResponsiveNavLink
