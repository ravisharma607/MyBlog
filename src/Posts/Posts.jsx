import React, { useEffect, useState } from 'react';
import './Posts.css'
import user from "./Img/user.png"
import axios from 'axios';
import { format } from 'date-fns'
import { Link } from 'react-router-dom';

const Posts = () => {

    const [posts, setPosts] = useState([]);
    document.title = 'MyBlog | Explore The World |';
    const allPosts = async () => {
        try {
            const res = await axios.get('https://bloguserapi-production.up.railway.app/posts');
        }
        catch (e) {
        }
    }

    useEffect(() => {
        allPosts();
    }, [])

    return (
        <div className="container">
                {posts.length > 0 && posts.map((item, index) => {
                    return <div className="post" key={index}>
                        <div className="image">
                            <Link to={`/post/${item._id}`}>  <img src={'https://bloguserapi-production.up.railway.app/' + item.cover} alt='' /></Link>
                        </div>
                        <div className="content flex">
                            <h2><Link to={`/post/${item._id}`}>{item.title}</Link></h2>
                            <div className="info">
                                <Link className="author">
                                    <img src={item.author ? `https://bloguserapi-production.up.railway.app/${item.author.profileImg}` : user} alt="profile" />
                                    {item.author ? item.author.name : 'Unknown'}
                                </Link>
                                <span>{format(new Date(item.createdAt), 'MMM d, yyyy HH:mm')}
                                </span>
                            </div>
                            <p>{item.summary}</p>
                        </div>
                    </div>
                })}
        </div>
    )
}

export default Posts