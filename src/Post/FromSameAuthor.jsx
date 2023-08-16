import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { format } from 'date-fns'
import user from "./Img/user.png"

const FromSameAuthor = ({ authorID }) => {
    const [postFromSameAuthor, setPostFromSameAuthor] = useState([]);
    const [userProfileImg, setUserProfileImg] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            if (authorID) {
                try {
                    const url = `https://bloguserapi-production.up.railway.app/sameauthor/${authorID}`;
                    const res = await axios.get(url);
                    const { posts, existingUserEmail } = res.data;
                    setPostFromSameAuthor(posts);
                    setUserProfileImg(existingUserEmail)
                } catch (error) {
                }
            } else {
            }
        };
        
        fetchData();
    }, [authorID]);
    
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="container">
            {postFromSameAuthor.length > 0 && postFromSameAuthor.map((item, index) => {
                console.log('from auth',item);
                return <div className="post flex" key={index}>
                    <div className="image">
                        <Link to={`/post/${item._id}`}>
                            <img src={item.cover ? `https://bloguserapi-production.up.railway.app/${item.cover}` : user} alt='' onClick={scrollToTop}/>
                        </Link>
                    </div>
                    <div className="content flex">
                        <h2><Link to={`/post/${item._id}`} onClick={scrollToTop}>{item.title}</Link></h2>
                        <div className="info">
                            <Link className="author">
                                <img src={userProfileImg.profileImg ?`https://bloguserapi-production.up.railway.app/`+userProfileImg.profileImg: user} alt="profile" />
                                {item.author.name}
                            </Link>
                            <span>{format(new Date(item.createdAt), 'MMM d, yyyy HH:mm')}
                            </span>
                        </div>
                        <p>{item.summary}</p>
                    </div>
                </div >
            })}
        </div >
    )
}

export default FromSameAuthor

