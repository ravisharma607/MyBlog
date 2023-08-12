import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = ({loggedIn, setLoggedIn}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '', password: ''
    })


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user, [name]: value
        })
    }

    const login = async (e) => {
        e.preventDefault();
        const { email, password } = user;
        if (email.trim() && password.trim()) {
            try {
                const res = await axios.post('https://bloguserapi-production.up.railway.app/login', { email, password },{withCredentials:true}); 
                const token = res.data.token;
                localStorage.setItem('my-token', token);
                setLoggedIn(true)
                navigate("/")
            }
            catch (err) {
                // toast.error(err.response.data.message);
                console.log('From Login',err);
            }
        }
        else {
            toast.warning('All Fields Are Required')
        }
    }


    return (
        <>
            <div className="loginSignupCard flex">
                <div className="heading">
                    <h2>Start Exploring Now</h2>
                </div>
                <form className='flex' onSubmit={login}>
                    <div className="fields flex">
                        <ion-icon name="mail-sharp"></ion-icon>
                        <input type="email" name="email" id="email" placeholder='email' value={user.email} onChange={handleChange} />
                    </div>
                    <div className="fields flex">
                        <ion-icon name="lock-closed-sharp"></ion-icon>
                        <input type="password" name="password" id="password" placeholder='password' value={user.password} onChange={handleChange} />
                    </div>
                    <div className="action">
                        <button className="btn">Login</button>
                        <div className="break flex">
                            <div><hr /></div>
                            <p>OR</p>
                            <div><hr /></div>
                        </div>
                        <button className="btn" onClick={() => navigate("/register")}>Register</button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </>
    )
}

export default Login