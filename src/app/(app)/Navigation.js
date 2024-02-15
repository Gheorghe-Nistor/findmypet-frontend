import ApplicationLogo from '@/components/ApplicationLogo'
import Dropdown from '@/components/Dropdown'
import Link from 'next/link'
import NavLink from '@/components/NavLink'
import DropdownLink, { DropdownButton } from '@/components/DropdownLink'
import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const Navigation = ({ user }) => {
    const router = useRouter()
    const { logout } = useAuth()
    const [open, setOpen] = useState(false)

    return (
        <nav className="bg-gray-800 border-b border-gray-500">
            {/* Primary Navigation Menu */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="h-full flex justify-between">
                    <div className="flex">
                        {/* Logo */}
                        <Link href="/home" className="p-1">
                            <ApplicationLogo />
                        </Link>

                        {/* Navigation Links */}
                        <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                            <NavLink
                                href="/home"
                                active={router.pathname === '/home'}>
                                Home
                            </NavLink>
                            <NavLink
                                href="/posts"
                                active={router.pathname === '/posts'}>
                                Posts
                            </NavLink>
                            <NavLink
                                href="/about"
                                active={router.pathname === '/about'}>
                                About
                            </NavLink>
                        </div>
                    </div>

                    {/* Settings Dropdown */}
                    <div className="hidden sm:flex sm:items-center sm:ml-6">
                        <Dropdown
                            align="right"
                            width="48"
                            trigger={
                                <button className="flex items-center text-sm font-medium text-white hover:text-gray-500 focus:outline-none transition duration-150 ease-in-out">
                                    <div className="mr-2">
                                        {user?.avatar ? (
                                            <img
                                                className="h-7 w-7 fill-current rounded-full"
                                                src={user?.avatar}
                                                alt="Avatar"
                                            />
                                        ) : (
                                            <svg
                                                className="h-7 w-7 fill-current rounded-full text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                />
                                            </svg>
                                        )}
                                    </div>
                                    <div className="font-bold">
                                        {user?.name}
                                        {!!user?.is_verified && (
                                            <small className="mx-1 font-normal px-1 bg-blue-300 text-white rounded-md border-2 border-blue-400/50">
                                                Verified
                                            </small>
                                        )}
                                        {user?.is_admin ? (
                                            <small className="mx-1 font-normal px-1 bg-red-300 text-white rounded-md border-2 border-red-400/50">
                                                Admin
                                            </small>
                                        ) : null}
                                    </div>
                                </button>
                            }>
                            {/* Authentication */}
                            <DropdownLink href={`/profile/${user.id}`}>
                                Profile
                            </DropdownLink>
                            <DropdownButton onClick={logout}>
                                Logout
                            </DropdownButton>
                        </Dropdown>
                    </div>

                    {/* Hamburger */}
                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setOpen(open => !open)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24">
                                {open ? (
                                    <path
                                        className="inline-flex"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        className="inline-flex"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navigation
