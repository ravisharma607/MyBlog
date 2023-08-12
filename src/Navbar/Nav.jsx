import React, { useEffect } from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import writeImg from './Img/edit.png'

const Nav = ({ loggedIn, setLoggedIn }) => {
  const navigate = useNavigate();

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
          console.log(res.data);
          if (res.status === 200) {
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


  const logout = () => {
    localStorage.removeItem('my-token');
    setLoggedIn(false);
    navigate('/');
  };


  return (
    <>
      <section>
        <nav className="navbar">
          <div className="container nav">
            <div className="logo">
              <Link to='/'><h2>My<b>Blogs</b> </h2></Link>
            </div>
            <div className="links">
              {loggedIn ? (
                <>
                  <div className='user_action flex'>
                    <Link to='/create' className='flex' ><img src={writeImg} alt="" /><span>Create</span></Link>
                    <Link onClick={logout}>Logout</Link>
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
      </section>
      <ToastContainer />
    </>
  )
}

export default Nav
