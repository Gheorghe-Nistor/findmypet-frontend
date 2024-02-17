import Button from '@/components/Button'
import { useState } from 'react'

const AddComment = ({ onSubmit }) => {
    const [comment, setComment] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        if (comment.trim()) {
            onSubmit(comment)
            setComment('')
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex justify-center items-center flex-col space-y-4">
            <textarea
                className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 dark:bg-gray-800 dark:text-white"
                rows="4"
                placeholder="Add a new comment..."
                value={comment}
                onChange={e => setComment(e.target.value)}></textarea>
            <Button
                type="submit"
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-dark-blue dark:hover:bg-dark-blue-700 text-white rounded-lg">
                Submit
            </Button>
        </form>
    )
}

export default AddComment
