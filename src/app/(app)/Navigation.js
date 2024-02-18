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
                        <Link href="/dashboard" className="p-1">
                            <ApplicationLogo />
                        </Link>

                        {/* Navigation Links */}
                        <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                            <NavLink
                                href="/dashboard"
                                active={router.pathname === '/dashboard'}>
                                Dashboard
                            </NavLink>
                            <NavLink
                                href="/posts/new"
                                active={router.pathname === '/posts/new'}>
                                New Post
                            </NavLink>
                        </div>
                    </div>

                    {/* Settings Dropdown */}
                    <div className="hidden sm:flex sm:items-center sm:ml-6">
                        <div className="mx-2">
                            <Link className="flex" href="/search">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 rounded-full text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </Link>
                        </div>
                        <div className="mx-2">
                            <Link className="flex" href="/direct">
                                <svg
                                    className="h-5 w-5 rounded-full text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                                    />
                                </svg>

                                <svg
                                    className="h-2 w-2 -ml-1 text-red-600 fill-current rounded-full"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                    />
                                </svg>
                            </Link>
                        </div>
                        <Dropdown
                            align="right"
                            width="48"
                            trigger={
                                <button
                                    className="flex items-center text-sm font-medium text-white hover:text-gray-500 focus:outline-none transition duration-150 ease-in-out">
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
                                            <small
                                                className="mx-1 font-normal px-1 bg-blue-300 text-white rounded-md border-2 border-blue-400/50">
                                                Verified
                                            </small>
                                        )}
                                        {user?.is_admin ? (
                                            <small
                                                className="mx-1 font-normal px-1 bg-red-300 text-white rounded-md border-2 border-red-400/50">
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
