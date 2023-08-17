import React, {useState, useEffect} from 'react'
import './Nav.css';
import { useNavigate } from 'react-router-dom';
import profileImg from './Img/user.png'
import { useAuth } from '../AuthContext/AuthContext';
import axios from 'axios';

const Profile = ({ onClose }) => {
    const navigate = useNavigate();
    const { setLoggedIn } = useAuth();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
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
                  setEmail(res.data.email)
                  setName(res.data.name)
                  setUserImg(res.data.profileImg)
              } catch (err) {
                  setLoggedIn(false);
              }
          } else {
              setLoggedIn(false);
          }
      };
      verifyUser();
  })





    const logout = () => {
        localStorage.removeItem('my-token');
        onClose(true);
        setLoggedIn(false);
        navigate('/');
    };

    return (
        <>
            <div className="card shadow flex">
                <div className="close flex" onClick={onClose}>
                    <ion-icon name="close"></ion-icon>
                </div>
                <div className="img">
                    <img src={userImg ? `https://bloguserapi-production.up.railway.app/${userImg}` : profileImg} alt="profile" />
                    <h2>{name}</h2>
                </div>
                <hr />
                <div className="profile_info flex">
                    <ion-icon name="mail-sharp"></ion-icon>
                    <h3>{email}</h3>
                </div>
                <div className="logout">
                    <button className="btn flex" onClick={logout}><ion-icon name="exit"></ion-icon>Logout</button>
                </div>
            </div>
        </>
    )
}

export default Profile