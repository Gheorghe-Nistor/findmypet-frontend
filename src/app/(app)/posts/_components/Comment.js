import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

const Comment = ({ profilePic, username, text }) => {
    return (
        <div className="flex items-start space-x-4 p-4 rounded-lg bg-white dark:bg-gray-800 shadow">
            {profilePic ? (
                <Image
                    src={profilePic}
                    alt="User Profile"
                    width={50}
                    height={50}
                    unoptimized={true}
                    className="rounded-full"
                />
            ) : (
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700">
                    <FontAwesomeIcon
                        icon={faUserCircle}
                        className="text-xl text-gray-400"
                    />
                </div>
            )}
            <div>
                <div className="font-semibold text-gray-900 dark:text-white">
                    {username}
                </div>
                <p className="text-gray-700 dark:text-gray-300">{text}</p>
            </div>
        </div>
    )
}

export default Comment
