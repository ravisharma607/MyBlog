import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Posts from './Posts/Posts';
import Layout from './Layout/Layout';
import Login from './SignupLogin/Login';
import Register from './SignupLogin/Register';
import { useState } from 'react';
import CreatePost from './CreatePost/CreatePost';
import Post from './Post/Post';
import EditPost from './EditPost/EditPost';


const Routing = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  return (
    <Routes>
      <Route path='/' element={<Layout loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}>
        <Route index element={
          <Posts />
        } />
        <Route path='/login' element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
        <Route path='/register' element={<Register />} />
        <Route path='/create' element={loggedIn ? <CreatePost /> : <Navigate to="/login" />} />
        <Route path='/post/:id' element={loggedIn ? <Post /> : <Navigate to="/" />} />
        <Route path='/edit/:id' element={loggedIn ? <EditPost /> : <Navigate to="/" />} />
      </Route>
    </Routes>
  )
}

function App() {
  return (
    <>
      <Routing />
    </>
  );
}

export default App;
