import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'

const LikeButton = ({
    initialLiked = false,
    initialLikes = 0,
    onLikeToggle,
}) => {
    const [liked, setLiked] = useState(initialLiked)
    const [likes, setLikes] = useState(initialLikes)

    const toggleLike = () => {
        const newLikedState = !liked
        const newLikesCount = newLikedState ? likes + 1 : likes - 1

        setLiked(newLikedState)
        setLikes(newLikesCount)

        if (onLikeToggle) {
            onLikeToggle(newLikedState, newLikesCount)
        }
    }

    return (
        <button
            onClick={toggleLike}
            className={`flex items-center px-4 py-2 space-x-2 text-sm font-medium rounded-full transition-colors duration-150 ${
                liked
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}>
            <FontAwesomeIcon icon={liked ? faHeartSolid : faHeartRegular} />
            <span>
                {likes} {liked ? 'Likes' : 'Like'}
            </span>
        </button>
    )
}

export default LikeButton
