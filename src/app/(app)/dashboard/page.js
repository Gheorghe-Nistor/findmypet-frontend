'use client'

import PostsMap from '../posts/_components/map/PostsMap'
import { usePost } from '@/hooks/post'
import Loading from '@/app/(app)/Loading'

const Dashboard = () => {
    const { posts } = usePost()
    if (!posts) {
        return <Loading />
    }

    return <PostsMap posts={posts.data} />
}

export default Dashboard
