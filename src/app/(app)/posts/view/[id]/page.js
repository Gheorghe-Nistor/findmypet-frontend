'use client'

import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import LargePost from '@/app/(app)/posts/_components/post/LargePost'
import LikeButton from '@/app/(app)/posts/_components/LikeButton'
import AddComment from '@/app/(app)/posts/_components/AddComment'
import Comment from '@/app/(app)/posts/_components/Comment'
import Loading from '@/app/(app)/Loading'
import { usePost } from '@/hooks/post'
import { useParams } from 'next/navigation'

const ViewPost = () => {

    const { fetchPostData } = usePost();
    const params = useParams();
    const [post, setPost] = useState(null);

    const Mocks = {
        Post: {
            userId: 1,
            username: 'Capitanu',
            description:
                '<p>Caine pierdut in zona Grozavesti, Ofer recompensa</p>\n<p>Cainele raspunde la numele <strong>Zeus.</strong></p>\n<p>Este de talie medie.</p>',
            lat: 44.4516732795682,
            lang: 26.043691635131836,
            reward: '10000',
            type: 'FOUND',
            tags: ['Grozavesti', 'Recompensa'],
            title: 'Caine pierdut in zona Grozavesti, Ofer recompensa',
            images: [
                'https://cdn.britannica.com/79/232779-004-9EBC7CB8/German-Shepherd-dog-Alsatian.jpg?s=1500x700&q=85',
                'https://cdn.britannica.com/70/8170-004-B976B858/Chihuahua-smooth-coat.jpg?s=1500x700&q=85',
                'https://cdn.britannica.com/78/232778-004-B0690D02/English-bulldog-dog.jpg?s=1500x700&q=85',
                'https://cdn.britannica.com/13/234213-004-554F9432/dachshund-dog.jpg?s=1500x700&q=85',
            ],
        },
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

    const handleCommentSubmit = comment => {
        const newComment = {
            id: comments.length + 1,
            username: user?.name,
            text: comment,
        }
        setComments([...comments, newComment])
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

    const handleDeletePost = () => {
        console.log('Delete Post')
        // TODO: delte post
    }

    return (
        <>
        {
            post && user &&
            <div>
                <div className="w-auto mx-auto bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg mb-5">
                    <LargePost post={post} user={user} onDeletePost={handleDeletePost} />
                    <LikeButton
                        initialLiked={Mocks.Like.initialLiked}
                        initialLikes={Mocks.Like.initialLikes}
                        onLikeToggle={handleLikeToggle}
                    />
                </div>

                <div>
                    <AddComment onSubmit={handleCommentSubmit} />
                </div>

                <div className="space-y-4 p-4">
                    {comments.map(comment => (
                        <Comment
                            key={comment.id}
                            username={comment.username}
                            text={comment.text}
                        />
                    ))}
                </div>
            </div>
        }
        </>
    )
}

export default ViewPost
