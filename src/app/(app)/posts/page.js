'use client'

import RichTextEditor from '@/components/RichTextEditor'
import { useState } from 'react'
import LocationPicker from '@/components/LocationPicker'
import TagInput from '@/components/TagInput'
import Button from '@/components/Button'

const Posts = () => {
    const [editorContent, setEditorContent] = useState('')
    const [selectedLocation, setSelectedLocation] = useState(null)
    const [tags, setTags] = useState([])

    const handleEditorChange = content => {
        setEditorContent(content)
    }

    const handleLocationSelect = location => {
        setSelectedLocation(location)
        console.log(location)
    }
    return (
        <>
            <form className="flex flex-col justify-center items-center">
                <h1 class="text-3xl md:text-2xl font-bold text-center text-white mb-8">
                    Report your missing pet: share details to aid in their safe
                    return
                </h1>
                <p>Description</p>
                <RichTextEditor
                    content={editorContent}
                    onContentChange={handleEditorChange}
                />
                <br />

                <h1>Select a Location</h1>
                <LocationPicker onLocationSelect={handleLocationSelect} />
                {selectedLocation && (
                    <p>
                        Latitude {selectedLocation.lat}, Longitude{' '}
                        {selectedLocation.lng}
                    </p>
                )}
                <br />

                <h1>Tags</h1>
                <TagInput tags={tags} setTags={setTags} />

                <br />
                <Button type="submit">Submit Post</Button>
            </form>
        </>
    )
}

export default Posts
