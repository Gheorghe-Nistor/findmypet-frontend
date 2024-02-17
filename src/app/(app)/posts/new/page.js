'use client'

import { useState } from 'react'

import TextEditor from '@/app/(app)/posts/_components/TextEditor'
import LocationPicker from '@/app/(app)/posts/_components/map/LocationPicker'
import { TagInput } from '@/components/Tags'
import Button from '@/components/Button'
import FlexCenterWrapper from '@/components/FlexCenterWrapper'
import Input from '@/components/Input'
import TypeSelector from '@/app/(app)/posts/_components/TypeSelector'
import LabeledFlexWrapper from '@/components/LabeledFlexWrapper'
import FileUploader from '@/components/FileUploader'
import axios from '@/lib/axios'

const NewPost = () => {
    const [title, setTitle] = useState('')
    const [selectedType, setSelectedType] = useState('REQUEST')
    const [tags, setTags] = useState([])
    const [reward, setReward] = useState(0)
    const [editorContent, setEditorContent] = useState('')
    const [selectedLocation, setSelectedLocation] = useState(null)
    const [files, setFiles] = useState([])

    const handleEditorChange = content => {
        setEditorContent(content)
    }

    const handleLocationSelect = location => {
        console.log(location)
        setSelectedLocation(location)
    }

    const handleSubmit = e => {
        e.preventDefault()
        const post = {
            title: title,
            type: selectedType,
            description: editorContent,
            lat: selectedLocation.lat,
            lang: selectedLocation.lng,
            reward,
            tags,
        }
        console.log(post)
        axios.post(`/api/posts`, post).catch(error => {
            console.error('Error:', error)
        })
    }

    return (
        <FlexCenterWrapper>
            <FlexCenterWrapper className="mb-10 w-2/3">
                <img src="/dog.png" width={150} height={150} alt="Logo" />
                <h1 className="text-2xl font-bold mt-2">
                    Lost or found a pet? Report here to help them find their way
                    home
                </h1>
                <div className="h-0.5 rounded-full w-full bg-yellow-500 mt-1"></div>
            </FlexCenterWrapper>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-center items-center gap-5">
                <LabeledFlexWrapper
                    label="Title"
                    labelFor="title"
                    className="w-1/2">
                    <Input
                        id="title"
                        type="text"
                        value={title}
                        placeholder="Enter a title for your post"
                        className="block mt-1 w-full"
                        onChange={event => setTitle(event.target.value)}
                        required
                        autoFocus
                    />
                </LabeledFlexWrapper>

                <LabeledFlexWrapper
                    label="Type"
                    labelFor="title"
                    className="w-1/2">
                    <TypeSelector
                        selectedType={selectedType}
                        onChange={event => setSelectedType(event.target.value)}
                    />
                </LabeledFlexWrapper>

                <LabeledFlexWrapper
                    label="Reward"
                    labelFor="reward"
                    className="w-1/2">
                    <Input
                        id="reward"
                        type="number"
                        min="0"
                        step="10"
                        value={reward}
                        className="block mt-1 w-full"
                        onChange={event => setReward(event.target.value)}
                        required
                        autoFocus
                    />
                </LabeledFlexWrapper>

                <LabeledFlexWrapper
                    label="Add relevant tags to enhance discoverability"
                    className="w-1/2">
                    <TagInput tags={tags} setTags={setTags} />
                </LabeledFlexWrapper>

                <LabeledFlexWrapper label="Share photos of your pet">
                    <FileUploader
                        files={files}
                        setFiles={setFiles}
                        multiple={true}
                    />
                </LabeledFlexWrapper>

                <LabeledFlexWrapper label="Description">
                    <TextEditor
                        content={editorContent}
                        onContentChange={handleEditorChange}
                    />
                </LabeledFlexWrapper>

                <LabeledFlexWrapper label="Pinpoint your pet’s last known location">
                    <LocationPicker onLocationSelect={handleLocationSelect} />
                    {selectedLocation && (
                        <p>
                            Latitude {selectedLocation.lat}, Longitude{' '}
                            {selectedLocation.lng}
                        </p>
                    )}
                </LabeledFlexWrapper>

                <Button type="submit">Submit</Button>
            </form>
        </FlexCenterWrapper>
    )
}

export default NewPost
