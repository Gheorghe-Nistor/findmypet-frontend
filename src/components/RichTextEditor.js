'use client'

import { Editor } from '@tinymce/tinymce-react'

export default function RichTextEditor({ content, onContentChange }) {
    return (
        <Editor
            apiKey="z4bprtbdkjh1v9eivxol3izwizwgo410e5ktjo5qwzh6a625"
            init={{
                plugins:
                    'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                toolbar:
                    'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                skin: 'oxide-dark',
                content_css: 'dark',
            }}
            value={content}
            onEditorChange={onContentChange}
        />
    )
}
