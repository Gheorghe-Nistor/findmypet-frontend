'use client'

import { useEffect, useState } from 'react'
import FileUploader from '@/components/FileUploader'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/auth'
import Loading from '@/app/(app)/Loading'
import Link from 'next/link'
import Button from '@/components/Button'
import axios from '@/lib/axios'
import useSWR from 'swr'

const Profile = () => {
    const { user, mutate: authMutator } = useAuth({ middleware: 'auth' })
    const params = useParams();
    const router = useRouter();
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);


    const [formData, setFormData] = useState(null);

    const { data: otherUser, error, mutate } = useSWR(`/api/user/${params.id}`, () =>
        axios
            .get(`/api/user/${params.id}`)
            .then(res => res.data)
    )

    useEffect(() => {
        if (otherUser) {
            setFormData({
                name: otherUser.name ?? '',
                email: otherUser.email ?? '',
                nickname: otherUser.nickname ?? '',
                is_admin: otherUser.is_admin,
                is_verified: otherUser.is_verified,
                address: otherUser.address ?? '',
                phone: otherUser.phone ?? '',
                description: otherUser.description ?? '',
            })
        }
    }, [otherUser])

    if (!user || !otherUser) {
        return <Loading />
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const forceDelete = async (user) => {
        await axios.delete(`/api/users/forceDelete/${user}`)

        router.push('/home')
    }

    const handleSubmit = (e, user, formData, mutate) => {
        e.preventDefault();
        axios
            .patch(`/api/users/${user}`, formData)
            .then(() => {
                mutate()
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const deleteProfile = (user, mutate, authMutator) => {
        axios
            .delete(`api/users/deleteProfilePhoto/${user}`)
            .then(() => {
                mutate()
                authMutator()
            })
    }

    const updateProfilePhoto = (user, files, mutate, authMutator) => {
        setLoading(true)

        if (!files || files.length === 0) {
            console.error('No files to upload.');
            setLoading(false);
            return;
        }

        const formData = new FormData()
        formData.append('file', files[0])
        formData.append("_method", "patch");
        axios
            .post(`api/users/profilePhoto/${user}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            .then(() => {
                mutate()
                authMutator()
                setFiles([])
                setLoading(false)
            });

        setFiles([])
        setLoading(false)
    }

    const isAdministratrOrCurrentUser = (user, params) => {
        return user?.is_admin || user?.id === Number(params.id)
    }

    const deactivateAccount = async (user, mutate) => {
        await axios.delete(`/api/users/${user}`)
        mutate()
    }

    const restoreAccount = async (user, mutate) => {
        await axios.patch(`/api/users/restore/${user}`)
        mutate()
    }

    return (
        <>
            <section className="w-auto mx-auto bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg">
                <div className="flex items-center justify-between">
                    <div>
                        <span
                            className={`text-white font-bold text-sm p-1 ${!!otherUser?.is_admin ? 'bg-red-500 border-red-900' : 'bg-emerald-500 border-emerald-900'} rounded-md border-2`}>{!!otherUser?.is_admin ? 'Admin User' : 'Basic User'}</span>
                        <span
                            className={`ml-1 text-white font-bold text-sm p-1 ${!!!otherUser?.is_admin ? 'bg-red-500 border-red-900' : 'bg-emerald-500 border-emerald-900'} rounded-md border-2`}>{!!!otherUser?.deleted_at ? 'Active' : 'Deactivated'}</span>

                    </div>
                    {

                        user?.id !== Number(params.id) && (
                            <div className="flex">
                                <Link href={`/direct/${otherUser?.id}`}>
                                    <button
                                        className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold py-2 px-4 rounded-md flex items-center shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 mr-2">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                        </svg>

                                        Send Message
                                    </button>
                                </Link>
                                {
                                    !!user?.is_admin && (<>{
                                        otherUser?.deleted_at != null ? (
                                            <>
                                            <button
                                                className="ml-1 bg-gradient-to-r from-emerald-500 to-emerald-500 hover:from-emerald-600 hover:to-green-600 text-white font-bold py-2 px-4 rounded-md flex items-center shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                                onClick={async () => {
                                                    await restoreAccount(otherUser?.id, mutate)
                                                }}
                                            >
                                                Restore
                                            </button>
                                            <button
                                                className="ml-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-2 px-4 rounded-md flex items-center shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                                onClick={async () => {
                                                    await forceDelete(otherUser?.id)
                                                }}
                                            >
                                                Delete Forever
                                            </button>
                                            </>
                                        )
                                        : (
                                            <button
                                                className="ml-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-2 px-4 rounded-md flex items-center shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                                onClick={async () => {
                                                    await deactivateAccount(otherUser?.id, mutate)
                                                }}
                                            >
                                                Deactivate
                                            </button>
                                        )
                                }
                                </>)
                                }
                            </div>
                        )}
                </div>
                <div className="mt-6 w-fit mx-auto">
                    {otherUser?.avatar ? (
                        <img src={otherUser?.avatar}
                             className="rounded-full fill-current h-28 w-28" alt="profile picture" srcSet="" />
                    ) : (
                        <svg
                            className="w-28 fill-current rounded-full text-white"
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
                <div className="mt-8 flex justify-center items-center">
                    <h2 className="text-white font-bold text-2xl tracking-wide">{otherUser?.name}</h2>
                    <span className="mx-1">
                    {
                        !!otherUser?.is_verified && (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor" className="w-6 h-6 text-blue-500 font-bold">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                            </svg>

                        )
                    }
                    </span>
                </div>
                <p className="flex justify-center items-center -mt-0.5 text-emerald-400 text-sm text-center font-semibold mt-2.5">
                    {otherUser?.email}
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-2 h-2 mx-1 text-white">
                            <path fillRule="evenodd"
                                  d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z"
                                  clipcule="evenodd" />
                        </svg>
                    </span>
                    <span className={otherUser?.phone ? 'text-emerald-400' : 'text-gray-400'}>
                        {otherUser?.phone ?? 'no phone number for this user.'}
                    </span>
                </p>
                {
                    (user?.is_admin || user?.id === Number(params.id)) && (
                        <div className="flex justify-center mt-5 text-sm text-white">
                            <span className="text-red-500 mr-1 font-bold">(PRIVATE INFORMATION)</span>
                            {otherUser?.address ?? 'no address is inserted for this user.'}
                        </div>
                    )
                }
                <div className="h-1 w-full bg-black mt-3 rounded-full">
                    <div className="h-1 rounded-full w-5/5 bg-yellow-500"></div>
                </div>
                <div className="mt-3 text-center text-white text-sm">
                    <span className="text-gray-400 font-semibold">{otherUser?.description ?? 'No content for description.'}</span>
                </div>
            </section>
            {
                isAdministratrOrCurrentUser(user, params) && formData !== null &&
                (
                    <div className="mt-3">
                        <FileUploader files={files} setFiles={setFiles} multiple={false} />

                        <div className="w-full text-right">
                            <Button className="mt-1.5 mx-1 bg-red-500 hover:bg-red-600 focus:bg-red-900"
                                    onClick={() => {
                                        deleteProfile(params.id, mutate, authMutator)
                                    }}>Delete avatar</Button>
                            <Button className="mt-1.5" onClick={() => {
                                updateProfilePhoto(params.id, files, mutate, authMutator)
                            }} disabled={loading}>Save avatar</Button>
                        </div>

                        <form onSubmit={(e) => { handleSubmit(e, params.id, formData, mutate) }} className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
                            <div className="mb-6">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-100">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full text-gray-900 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-100">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full text-gray-900 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="nickname" className="block text-sm font-medium text-gray-100">
                                    Nickname
                                </label>
                                <input
                                    type="text"
                                    id="nickname"
                                    name="nickname"
                                    value={formData.nickname}
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full text-gray-900 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="address" className="block text-sm font-medium text-gray-100">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full text-gray-900 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-100">
                                    Phone
                                </label>
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full rounded-md text-gray-900 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-100">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="mt-1 p-2 block w-full rounded-md text-gray-900 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                ></textarea>
                            </div>
                            {
                                !!user?.is_admin && (
                                    <>
                                <div className="mb-6 flex items-center">
                                    <input
                                        id="is_verified"
                                        name="is_verified"
                                        type="checkbox"
                                        checked={formData.is_verified}
                                        onChange={handleChange}
                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                    />
                                    <label htmlFor="is_verified"
                                           className="ml-2 block text-sm font-medium text-gray-100">
                                        Is Verified
                                    </label>
                                </div>
                                <div className="mb-6 flex items-center">
                                    <input
                                        id="is_admin"
                                        name="is_admin"
                                        type="checkbox"
                                        checked={formData.is_admin}
                                        onChange={handleChange}
                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                    />
                                    <label htmlFor="is_admin" className="ml-2 block text-sm font-medium text-gray-100">
                                        Is Admin
                                    </label>
                                </div>
                                    </>
                            )}
                            <div className="col-span-2">
                                <button
                                    type="submit"
                                    className="w-full uppercase bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Update User
                                </button>
                            </div>
                        </form>
                    </div>
                )
            }
        </>
    )
}

export default Profile;
