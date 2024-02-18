'use client';

import { useState } from 'react';
import axios from '@/lib/axios'
import Link from 'next/link'

const Search = () => {
    const [searchInput, setSearchInput] = useState(null);
    const [searchType, setSearchType] = useState('user');
    const [searchResults, setSearchResults] = useState(null);
    const [blockedSearchInput, setBlockedSearchInput] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmitSearch = (searchInput, searchType) => {
        setLoading(true);
        setBlockedSearchInput(searchInput);

        axios
            .post(searchType === 'user' ? '/api/user/search' : '/api/post/search', { search: searchInput })
            .then((result) => {
                setSearchResults(result.data)
                setLoading(false)
            })
            .catch(() => { setLoading(false) })
    }

    const handleKeyDown = async (e, searchInput, searchType) => {
        if (e.key === 'Enter' && !loading) {
            e.preventDefault(); // Prevent the default behavior of Enter key
            await handleSubmitSearch(searchInput, searchType);
        }
    };

    return (
        <>
            <div className="mt-2 flex rounded-md shadow-sm">
                <div className="relative flex flex-grow items-stretch focus-within:z-10">
                    <div className="absolute inset-y-0 left-0 flex items-center">
                        <label htmlFor="country" className="sr-only">
                            Country
                        </label>
                        <select
                            value={searchType}
                            onChange={(e) => { setSearchType(e.target.value) }}
                            id="country"
                            name="country"
                            autoComplete="country"
                            className="h-full rounded-md border-0 bg-transparent py-0 pl-3 pr-7 text-gray-500 focus:outline-none focus:ring-0 sm:text-sm"
                        >
                            <option value="user">User</option>
                            <option value="post">Post</option>
                        </select>
                    </div>
                    <input
                        onKeyDown={async (e) => { await handleKeyDown(e, searchInput, searchType) }}
                        type="email"
                        name="email"
                        id="email"
                        onChange={(e) => {
                            setSearchInput(e.target.value)
                        }}
                        className="block w-full bg-gray-900 rounded-full border-0 p$x-2 py-1.5 pl-16 text-gray-400 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-gray-700 sm:text-sm sm:leading-6"
                        placeholder={searchType === 'user' ? 'Enter here the user name that you want to search.' : 'Enter here the type of pet you want to search through the posts.'}
                    />
                </div>
                <button
                    onClick={() => { handleSubmitSearch(searchInput, searchType) }}
                    type="button"
                    className="relative -ml-20 inline-flex items-center gap-x-1.5 bg-gray-700 rounded-full px-2 py-1.5 text-sm font-semibold text-gray-400 z-10 ring-inset ring-gray-700 hover:bg-gray-600"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fill-rule="evenodd"
                              d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                              clip-rule="evenodd" />
                    </svg>

                    Search
                </button>
            </div>

            <div className="mt-5">
            {
                loading ? (
                    <div className="flex justify-center">
                        <svg aria-hidden="true"
                             className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-900"
                             viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor" />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill" />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                ) : (
                    <>
                        {
                            (searchResults === null || !!!searchResults.length) ? (
                                <>
                                    <div className="text-center text-gray-400">
                                        No results for the current {searchType} were
                                        found {blockedSearchInput ? ' with: ' : ''}
                                        <span className="text-gray-100 font-bold">
                                            {blockedSearchInput}
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <ul
                                    role="list"
                                    className="divide-y divide-gray-800 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
                                >
                                    {searchResults.map(searchResult => (
                                        <Link href={`/profile/${searchResult.id}`}>
                                            <li key={searchResult.id} className="bg-gray-900 relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-700 sm:px-6">
                                                <div className="flex min-w-0 gap-x-4">
                                                    {searchResult.avatar ? (
                                                        <img src={searchResult.avatar}
                                                             className="h-12 w-12 flex-none rounded-full bg-gray-50" alt="profile picture" srcSet="" />
                                                    ) : (
                                                        <svg
                                                            className="h-12 w-12 flex-none rounded-full bg-gray-200"
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
                                                    <div className="min-w-0 flex-auto">
                                                        <p className="text-sm font-semibold leading-6 text-gray-100">
                                                            <span className="absolute inset-x-0 -top-px bottom-0" />
                                                            {searchResult.name}
                                                            {!!searchResult?.is_verified && (
                                                                <small
                                                                    className="mx-1 font-normal px-1 bg-blue-300 text-white rounded-md border-2 border-blue-400/50">
                                                                    Verified
                                                                </small>
                                                            )}
                                                            {!!searchResult?.is_admin && (
                                                                <small
                                                                    className="mx-1 font-normal px-1 bg-red-300 text-white rounded-md border-2 border-red-400/50">
                                                                    Admin
                                                                </small>
                                                            )}
                                                            {!!searchResult?.deleted_at && (
                                                                <small
                                                                    className="mx-1 font-normal px-1 bg-gradient-to-r from-orange-300 to-red-300 text-white rounded-md border-2 border-red-400/500">
                                                                    Account Deactivated
                                                                </small>
                                                            )}
                                                        </p>
                                                        <p className="mt-1 flex text-xs leading-5 text-gray-500">
                                                            <span className="relative truncate hover:underline">
                                                                {searchResult.email}
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex shrink-0 items-center gap-x-4">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                                         stroke="currentColor" className="h-5 w-5 flex-none text-gray-400" aria-hidden="true">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                                    </svg>
                                                </div>
                                            </li>
                                        </Link>
                                    ))}
                                </ul>
                            )
                        }
                    </>
                )
            }
            </div>
        </>
    );
}

export default Search;
