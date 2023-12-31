import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import profileImg from './Img/user.png'
const Register = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: '', email: '', password: ''
    })
    const [userImg, setUserImg] = useState(profileImg)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user, [name]: value
        })
    }

    const handleFileChange = (e)=>{
        e.preventDefault();
        const selectedFile = e.target.files[0];
        const objectURL = URL.createObjectURL(selectedFile);
        setUserImg(objectURL);
        setUser({
            ...user,
            userImg: selectedFile
        });
    }

    const register = async (e) => {
        e.preventDefault();
        const { name, email, password, userImg } = user;
        if (name.trim() && email.trim() && password.trim() && userImg) {
            try {
                const formData = new FormData();
                formData.append('name', name);
                formData.append('email', email);
                formData.append('password', password);
                formData.append('userImg', user.userImg);
                const res = await axios.post('https://bloguserapi-production.up.railway.app/register',formData)
                toast.success(res.data.message);
                setTimeout(() => {
                    navigate("/login")
                }, 5000);
            }
            catch (err) {
                toast.error(err.response.data.message)
            }
        }
        else {
            toast.error('All Fields Are Required')
        }
    }

    return (
        <>
        <div className="loginSignupCard flex">
            <div className="heading">
                <h2>Start Exploring Now</h2>
            </div>
            <form className='flex' onSubmit={register}>
                <div className="profileImg flex">
                    <img src={userImg} alt="" />
                    <input type="file" name="file" id="file" onChange={handleFileChange} />
                </div>
                <div className="fields flex">
                    <ion-icon name="person-sharp"></ion-icon>
                    <input type="text" name="name" id="name" placeholder='username' value={user.name} onChange={handleChange} />
                </div>
                <div className="fields flex">
                    <ion-icon name="mail-sharp"></ion-icon>
                    <input type="email" name="email" id="email" placeholder='email' value={user.email} onChange={handleChange} />
                </div>
                <div className="fields flex">
                    <ion-icon name="lock-closed-sharp"></ion-icon>
                    <input type="password" name="password" id="password" placeholder='password' value={user.password} onChange={handleChange} />
                </div>
                <div className="action">
                    <button className="btn">Register</button>
                    <div className="break flex">
                        <div><hr /></div>
                        <p>OR</p>
                        <div><hr /></div>
                    </div>
                    <button className="btn" onClick={() => navigate("/login")}>Login</button>
                </div>
            </form>
        </div>
        <Toaster />
        </>
    )
}

export default Register