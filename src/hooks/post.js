import axios from '@/lib/axios'
import useSWR from 'swr'

export const usePost = () => {
    const { data: posts, error, mutate } = useSWR('/api/posts', () =>
        axios
            .get('/api/posts')
            .then(res => res.data)
    )

    const fetchPostData = ({ postId, setPost }) => {
        axios
            .get(`/api/posts/${postId}`)
            .then(res => setPost(res.data.data))
    }


    return {
        posts,
        fetchPostData
    }
}
