import React, { useState, useEffect } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Editor = ({ value, onChange }) => {
    const [editorContent, setEditorContent] = useState(value);
    useEffect(() => {
        setEditorContent(value);
    }, [value]); 
    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['bold', 'italic', 'underline'],
            ['link', 'image'], // Include the image module
            ['clean']
        ],
    };
    const handleEditorChange = (content) => {
        setEditorContent(content);
        onChange(content);
    };
    return (
        <ReactQuill theme="snow" value={editorContent} onChange={handleEditorChange} modules={modules} />
    )
}

export default Editor