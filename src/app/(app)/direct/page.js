'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useDirect } from '@/hooks/direct'
import { useAuth } from '@/hooks/auth'
import Loading from '@/app/(app)/Loading'
import axios from '@/lib/axios'

const Direct = () => {
    const [directsStructure, setDirectsStructure] = useState(null)
    const [loading, setLoading] = useState(true)
    const { fetchMessages } = useDirect()
    const { user } = useAuth({ middleware: 'auth' })

    if (!user) {
        return <Loading />
    }

    useEffect( () => {
        if (directsStructure === null) {
            const getMessages = async () => {
                await fetchMessages({ setDirectsStructure })
            }

            getMessages()
                .catch(console.error)
        }

        setLoading(false)
    }, [directsStructure])

    const handleClick = async (url) => {
        setLoading(true)

        const { data } = await axios.get(url)

        setDirectsStructure(data.data)
        setLoading(false)
    }

    return (
        <>
        {
            directsStructure === null || loading === true ?
            (
                <div className="flex justify-center">
                    <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>
            )
            :
            (
                <>
                    <ul
                        role="list"
                        className="divide-y divide-gray-800 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
                    >
                        {directsStructure.data.map((directStructure) => (
                            <Link href={`/direct/${directStructure.sender.id}`}>
                                <li key={directStructure.last_message_id} className="bg-gray-900 relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-700 sm:px-6">
                                    <div className="flex min-w-0 gap-x-4">
                                        <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={directStructure.sender.avatar} alt="" />
                                        <div className="min-w-0 flex-auto">
                                            <p className="text-sm font-semibold leading-6 text-gray-100">
                                                <span className="absolute inset-x-0 -top-px bottom-0" />
                                                {directStructure.sender.name}
                                            </p>
                                            <p className="mt-1 flex text-xs leading-5 text-gray-500">
                                                <span className="relative truncate hover:underline">
                                                    {directStructure.sender.email}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex shrink-0 items-center gap-x-4">
                                        <div className="hidden sm:flex sm:flex-col sm:items-end">
                                            <p className={`text-sm leading-6 text-gray-300 ${(directStructure.seen ?? false) ? 'font-bold' : 'font-normal'}`}>
                                                {(!directStructure.seen) && <span className="text-red-600 mr-1 font-bold">[UNREAD]</span>}
                                                {directStructure.text}
                                            </p>
                                        </div>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                             stroke="currentColor" className="h-5 w-5 flex-none text-gray-400" aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                        </svg>
                                    </div>
                                </li>
                            </Link>
                        ))}
                    </ul>

                    <nav
                        className="flex items-center justify-between border-t border-gray-600 bg-gray-600 px-4 py-3 sm:px-6"
                        aria-label="Pagination"
                        >
                        <div className="hidden sm:block">
                            <p className="text-sm text-gray-200">
                                Showing <span className="font-medium">{directsStructure.from}</span> to <span className="font-medium">{directsStructure.to}</span> of{' '}
                                <span className="font-medium">{directsStructure.total}</span> results
                            </p>
                        </div>
                        <div className="flex flex-1 justify-between sm:justify-end">
                            {
                                directsStructure.prev_page_url &&
                                <button
                                    onClick={async () => {await handleClick(directsStructure.prev_page_url)}}
                                    className="relative ml-3 inline-flex items-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-gray-200 ring-1 ring-inset ring-gray-900 hover:bg-gray-900 focus-visible:outline-offset-0"
                                >
                                    Previous
                                </button>
                            }
                            {
                                directsStructure.next_page_url &&
                                <button
                                    onClick={async () => {await handleClick(directsStructure.next_page_url)}}
                                    className="relative ml-3 inline-flex items-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-gray-200 ring-1 ring-inset ring-gray-900 hover:bg-gray-900 focus-visible:outline-offset-0"
                                >
                                    Next
                                </button>
                            }
                        </div>
                    </nav>
            </>)}
        </>
    );
}

export default Direct
