import React, { useEffect, useState } from 'react';
import './Post.css'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom';
import user from "./Img/user.png";
import { format } from 'date-fns';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../AuthContext/AuthContext';
import FromSameAuthor from './FromSameAuthor';

const Post = () => {
    const navigate = useNavigate();
    const { userId } = useAuth();
    const [postInfo, setPostInfo] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axios.get(`https://bloguserapi-production.up.railway.app/post/${id}`)
                setPostInfo(res.data);
                document.title = res.data.title;
            }
            catch (e) {
                console.log('From Post', e);
            }
        }
        fetchPost();
    }, [id])


    const deletepost = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('my-token');
            const res = await axios.delete(`https://bloguserapi-production.up.railway.app/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success(res.data.message);
            navigate("/");
        }
        catch (err) {
        }
    }

    return (
        <>
            <div className="container">
                {
                    postInfo &&
                    <>
                        <div className="blogPost">
                            <div className="info">
                                <h2>{postInfo.title}</h2>
                            </div>
                            <div className="image">
                                <img src={'https://bloguserapi-production.up.railway.app/' + postInfo.cover} alt="" />
                            </div>
                            <div className="content">
                                <div className="author">
                                    <Link href="#" className='author'>
                                        <img src={postInfo.author ? `https://bloguserapi-production.up.railway.app/${postInfo.author.profileImg}` : user} alt="profile" />
                                        {postInfo.author ? postInfo.author.name : 'unknown'}
                                    </Link>
                                    <span>{postInfo.createdAt ? format(new Date(postInfo.createdAt), 'MMM d, yyyy HH:mm') : ''}
                                    </span>
                                </div>
                                <div className="summary">
                                    <p><i>{postInfo.summary}</i></p>
                                </div>
                                <div dangerouslySetInnerHTML={{ __html: postInfo.content }} className='desc'></div>
                            </div>
                            {userId === (postInfo.author ? postInfo.author._id : '') &&
                                (
                                    <div className="edit_delete">
                                        <Link to={`/edit/${id}`} className='btn flex' style={{ marginTop: '15px' }}>Edit Post</Link>
                                        <Link to={`/delete/${id}`} className='btn flex del' style={{ marginTop: '15px' }} onClick={deletepost}>Delete Post</Link>
                                    </div>
                                )
                            }
                        </div>
                        <section className='FromSameAuthor'>
                            <hr />
                            <FromSameAuthor authorID={postInfo.author ? postInfo.author._id : ''} />
                        </section>
                    </>
                }
            </div>
            <Toaster />
        </>
    )
}

export default Post