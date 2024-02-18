'use client'

import axios from '@/lib/axios'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import LargePost from '@/app/(app)/posts/_components/post/LargePost'
import LikeButton from '@/app/(app)/posts/_components/LikeButton'
import Loading from '@/app/(app)/Loading'
import { usePost } from '@/hooks/post'
import { useParams, useRouter } from 'next/navigation'

const ViewPost = () => {

    const { fetchPostData } = usePost();
    const params = useParams();
    const router = useRouter();
    const [post, setPost] = useState(null);

    const Mocks = {
        Like: {
            initialLiked: true,
            initialLikes: 100,
        },
        Comments: [
            {
                id: 1,
                username: 'Dumitru',
                text: 'L-am vazut in dimineata astas',
            },
            {
                id: 2,
                username: 'Maria',
                text: 'Cam mica recompensa',
            },
        ],
    }
    const { user } = useAuth({ middleware: 'auth' })
    const [comments, setComments] = useState(Mocks.Comments)

    const handleLikeToggle = (liked, likes) => {
        console.log(`Liked: ${liked}, Likes Count: ${likes}`)
        // TODO: like post
    }

    useEffect(() => {
        if (post === null) {
            const fetchPost = async () => {
                await fetchPostData({ postId: params.id, setPost })
            }

            fetchPost()
                .catch(console.error)
        }
    }, [])

    if (!post || !user) {
        return <Loading />
    }

    const handleDeletePost = (postId) => {
        axios
            .delete(`/api/posts/forceDelete/${postId}`)
            .then(() => router.push('/dashboard'))
    }

    return (
        <>
        {
            post && user &&
            <div>
                <div className="w-auto mx-auto bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg mb-5">
                    <LargePost post={post} user={user} onDeletePost={() => { handleDeletePost(params.id) }} />
                    <LikeButton
                        initialLiked={Mocks.Like.initialLiked}
                        initialLikes={Mocks.Like.initialLikes}
                        onLikeToggle={handleLikeToggle}
                    />
                </div>
            </div>
        }
        </>
    )
}

export default ViewPost
