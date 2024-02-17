import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUploader = ({ setFiles, files, multiple }) => {
    const onDrop = useCallback(
        (acceptedFiles) => {
            // If multiple files are allowed, concatenate them with existing files
            // Otherwise, replace existing files with the new one
            const updatedFiles = multiple ? [...files, ...acceptedFiles] : acceptedFiles;
            setFiles(updatedFiles);
        },
        [multiple, files]
    );

    const removeFile = (file) => {
        // Remove the selected file from the list
        const updatedFiles = files.filter((item) => item !== file);
        setFiles(updatedFiles);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple });

    return (
        <div className="border-2 border-dashed border-gray-400 p-4 rounded-xl">
            <div {...getRootProps()} className={`cursor-pointer ${isDragActive ? 'bg-gray-100' : ''}`}>
                <input {...getInputProps()} />
                <p className="text-center">{
                    multiple ? 'Drag and drop some files here, or click to select files' : 'Drag and drop a file here, or click to select a file'
                }</p>
            </div>
            <div className="mt-4">
                <h2 className="text-lg font-semibold">Uploaded Files:</h2>
                <ul>
                    {files.map((file, index) => (
                        <li key={index} className="flex justify-between items-center">
                            <span>{file.name}</span>
                            <button
                                className="text-red-500 hover:text-red-700"
                                onClick={() => removeFile(file)}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default FileUploader;
