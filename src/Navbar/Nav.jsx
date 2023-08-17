import React, { useState,useEffect } from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';
import writeImg from './Img/edit.png'
import profileImg from './Img/user.png'
import Profile from './Profile';
import { useAuth } from '../AuthContext/AuthContext';
import axios from 'axios';

const Nav = () => {
  const { loggedIn, setLoggedIn } = useAuth();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const [userImg, setUserImg] = useState('');

  useEffect(() => {
    const verifyUser = async () => {
        const storedToken = localStorage.getItem('my-token');
        if (storedToken) {
            try {
                const res = await axios.get('https://bloguserapi-production.up.railway.app/profile', {
                    headers: {
                        Authorization: `Bearer ${storedToken}`
                    }
                });
                setUserImg(res.data.profileImg)
                console.log('User Image:', res.data.profileImg);
            } catch (err) {
                setLoggedIn(false);
            }
        } else {
            setLoggedIn(false);
        }
    };
    verifyUser();
})


  const handleProfileClick = () => {
    setIsProfileModalOpen(true)
    if (isProfileModalOpen) {
      setIsProfileModalOpen(false)
    }
  }
  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };
  return (
    <section>
      <nav className="navbar">
        <div className="nav">
          <div className="logo">
            <Link to='/'><h2>RV</h2><b>Blogs</b></Link>
          </div>
          <div className="links">
            {loggedIn ? (
              <>
                <div className='user_action flex'>
                  <Link to='/create' className='flex' ><img src={writeImg} alt="" /><span>Create</span></Link>
                  <Link className='userProfile' onClick={handleProfileClick}><img src={userImg ? `https://bloguserapi-production.up.railway.app/` + userImg : profileImg} alt="profile" /></Link>
                </div>
              </>
            ) : (
              <>
                <Link to="./login">Login</Link>
                <Link to="./register">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>
      {isProfileModalOpen && (
        <Profile
          onClose={closeProfileModal}
        />
      )}
    </section>
  )
}

export default Nav
