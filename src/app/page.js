'use client'

import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/Button'
import { useAuth } from '@/hooks/auth'
import { redirect } from 'next/navigation'

const Home = () => {
    const { user } = useAuth({ middleware: 'guest' })
    if (user) {
        redirect('/dashboard')
    }
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex flex-col w-3/4">
                <div className="flex gap-10">
                    <Image
                        src="/lost.png"
                        width={400}
                        height={400}
                        alt="Logo"
                    />
                    <div className="flex flex-col justify-center items-start">
                        <p className="text-4xl">Welcome to FindMyPet!</p>
                        <br />
                        <p>
                            Every year, thousands of pets go missing, leaving
                            families anxious and searching for their beloved
                            companions. At FindMyPet, we understand the
                            emotional turmoil that losing a pet can cause.
                            That's why we've created a dedicated space for pet
                            owners and animal lovers to come together in the
                            search for missing pets.
                        </p>
                        <br />
                        <p className="text-xl mb-1">How It Works</p>
                        <p>
                            If your pet has gone missing, simply register and
                            post their details to alert the FindMyPet community.
                            Spot a lost pet? Share your sighting with us.
                            Together, we can make reunions possible.
                        </p>
                        <br />
                        <p className="text-xl mb-1">Get Started Now</p>
                        <p>
                            Join our community and be a part of a network
                            dedicated to bringing lost pets back home. Because
                            every pet deserves to find their way back to their
                            family.
                        </p>
                        <br />
                        <div className="flex justify-center items-center gap-5 max-w-full">
                            <Link href="/login">
                                <Button>Login</Button>
                            </Link>

                            <Link href="/register">
                                <Button>Register</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
