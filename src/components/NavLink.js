import Link from 'next/link'

const NavLink = ({ active = false, children, ...props }) => (
    <Link
        {...props}
        className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out ${
            active
                ? 'border-blue-400 text-blue-300 focus:border-blue-700'
                : 'border-transparent text-white hover:text-gray-400 hover:border-gray-300 focus:text-gray-500 focus:border-gray-300'
        }`}>
        {children}
    </Link>
)

export default NavLink
