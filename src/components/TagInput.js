import React, { useState } from 'react'
import Input from './Input'

const TagInput = ({ tags, setTags }) => {
    const [input, setInput] = useState('')

    const handleKeyDown = event => {
        if (event.key === 'Enter' && input) {
            if (!tags.includes(input.trim())) {
                setTags([...tags, input.trim()])
                setInput('')
            }
            event.preventDefault()
        }
    }

    const removeTag = indexToRemove => {
        setTags(tags.filter((_, index) => index !== indexToRemove))
    }

    return (
        <div className="w-full flex flex-col flex-wrap justify-center items-center">
            <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-2 text-black bg-gray-200 px-2 py-1 rounded-xl">
                        {tag}
                        <button
                            className="text-black hover:text-red-500"
                            onClick={() => removeTag(index)}>
                            &times;
                        </button>
                    </div>
                ))}
            </div>
            <Input
                className="mt-2 p-1 border rounded text-black w-2/5"
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type and press enter to add tags"
            />
        </div>
    )
}

export default TagInput
