import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [userImg, setUserImg] = useState('');
    const [userId, setUserId] = useState('')

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
                    setUserId(res.data.id)
                    if (res.status == 200) {
                        setLoggedIn(true);
                    } else {
                        setLoggedIn(false);
                    }
                } catch (err) {
                    setLoggedIn(false);
                }
            } else {
                setLoggedIn(false);
            }
        };
        verifyUser();
    }, [setLoggedIn])
    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn, email, name, userImg, userId }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
