import React, { useEffect, useState } from 'react';
import './Create.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Editor from '../Editor/Editor';

const CreatePost = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = '';
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);


    const CreateNewPost = async (e) => {
        e.preventDefault();
        if (!title || !summary || !content || !files[0]) {
            toast.warning('All fields are required')
            return;
        }
        const data = new FormData();
        data.append('title', title);
        data.append('summary', summary);
        data.append('content', content);
        data.append('file', files[0]);
        try {
            const token = localStorage.getItem('my-token');
            const res = await axios.post('https://bloguserapi-production.up.railway.app/post', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success(res.data.message);
            navigate('/')
        }
        catch (err) {
        }
    }

    return (
        <>
            <div className="container">
                <form className='blogForm' onSubmit={CreateNewPost}>
                    <div className="inputs">
                        <input type="text" name="title" id="title" placeholder='Blog Title' value={title} onChange={(e) => setTitle(e.target.value)} />
                        <input type="text" name="summary" id="summary" placeholder='Quick Summary' value={summary} onChange={(e) => setSummary(e.target.value)} />
                        <input type="file" name="file" id="file" onChange={(e) => setFiles(e.target.files)} />
                    </div>
                    <Editor value={content} onChange={setContent} />
                    <button className="btn" id='btn'>Create Post</button>
                </form>
            </div>
            <ToastContainer />
        </>
    )
}

export default CreatePost