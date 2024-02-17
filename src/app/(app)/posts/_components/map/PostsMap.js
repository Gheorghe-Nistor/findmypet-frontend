import { useState } from 'react'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import PostModal from '../post/PostModal'

const PostsMap = ({ posts }) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_APP_KEY,
    })

    const [selectedPost, setSelectedPost] = useState(null)

    const handleMarkerClick = post => {
        setSelectedPost(post)
    }

    const handleCloseModal = () => {
        setSelectedPost(null)
    }

    const mapContainerStyle = {
        width: '100%',
        height: '500px',
    }

    if (!isLoaded) return <div>Loading...</div>

    return (
        <>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={10}
                center={
                    posts[0] && {
                        lat: posts[0].lat,
                        lng: posts[0].lang,
                    }
                }>
                {posts.map(post => (
                    <Marker
                        key={post.id}
                        position={{ lat: post.lat, lng: post.lang }}
                        onClick={() => handleMarkerClick(post)}
                    />
                ))}
            </GoogleMap>
            {selectedPost && (
                <PostModal
                    isOpen={!!selectedPost}
                    onClose={handleCloseModal}
                    post={selectedPost}
                />
            )}
        </>
    )
}

export default PostsMap
