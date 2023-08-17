import React from 'react'
import './Nav.css';
import { useNavigate } from 'react-router-dom';
import profileImg from './Img/user.png'
import { useAuth } from '../AuthContext/AuthContext';

const Profile = ({ onClose }) => {
    const navigate = useNavigate();
    const { email, name, userImg, setLoggedIn } = useAuth();
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