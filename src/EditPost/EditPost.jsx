import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import './EditPost.css'
import Editor from '../Editor/Editor';

const EditPost = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [files, setFiles] = useState('');
    const [content, setContent] = useState('');
    const { id } = useParams();
    useEffect(() => {
        try {
            axios.get(`https://bloguserapi-production.up.railway.app/post/${id}`)
                .then((res) => {
                    setTitle(res.data.title);
                    setSummary(res.data.summary);
                    setContent(res.data.content);
                })
        }
        catch (err) {
        }
    }, [id])


    const updatePost = async (e) => {
        e.preventDefault();
        if (!title || !summary || !content || !files[0]) {
            toast.error('All fields are required')
            return;
        }
        const data = new FormData();
        data.append('title', title);
        data.append('summary', summary);
        data.append('content', content);
        data.append('file', files[0]);
        data.append('id', id)
        try {
            const token = localStorage.getItem('my-token');
            const res = await axios.put('https://bloguserapi-production.up.railway.app/post', data, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            toast.success(res.data.message)
            if (res.status === 200) {
                navigate('/')
            }
        }
        catch (e) {

        }
    }

    return (
        <>
            <div className="container">
                <form className='blogForm' onSubmit={updatePost}>
                    <div className="inputs">
                        <input type="text" name="title" id="title" placeholder='Blog Title' value={title} onChange={(e) => setTitle(e.target.value)} />
                        <input type="text" name="summary" id="summary" placeholder='Quick Summary' value={summary} onChange={(e) => setSummary(e.target.value)} />
                        <input type="file" name="file" id="file" onChange={(e) => setFiles(e.target.files)} />
                    </div>
                    <Editor value={content} onChange={setContent} />
                    <button className="btn">Update Post</button>
                </form>
            </div>
            <Toaster />
        </>
    )
}

export default EditPost