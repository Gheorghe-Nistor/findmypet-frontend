'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import axios from '@/lib/axios'

const Profile = ({ params }) => {
    const userId = params.id
    const [profile, setProfile] = useState(null)

    useEffect(() => {
        axios
            .get(`/api/users/${userId}`)
            .then(response => {
                const profileData = response.data.data
                console.log(profileData)
                setProfile(profileData)
            })
            .catch(error => {
                console.error('Error fetching user data:', error)
            })
    }, [userId])

    return (
        <div className="flex flex-col justify-center items-center">
            {profile?.avatar && (
                <Image
                    loader={() => profile.avatar}
                    src={profile.avatar}
                    alt="Profile picture"
                    width={96}
                    height={96}
                    unoptimized
                    priority
                />
            )}
            <br />
            <table className="divide-y divide-gray-800">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                    <tr>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                            Name
                        </td>
                        <td>{profile?.name}</td>
                    </tr>
                    <tr>
                        <td className="whitespace-nowrap px-3 py-4 text-sm ">
                            Nickname
                        </td>

                        <td>{profile?.nickname || '-'}</td>
                    </tr>
                    <tr>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                            Email
                        </td>
                        <td>{profile?.email}</td>
                    </tr>
                    <tr>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                            Phone
                        </td>
                        <td>{profile?.phone || '-'}</td>
                    </tr>
                    <tr>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                            Created at
                        </td>
                        <td>
                            {new Date(profile?.created_at)
                                .toLocaleDateString('default', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                })
                                .replace(/\//g, '.')}
                        </td>
                    </tr>
                </tbody>
            </table>
            <br />
            {profile?.description && <p>{profile.description}</p>}
        </div>
    )
}

export default Profile
