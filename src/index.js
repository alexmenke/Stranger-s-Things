import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
/* we only need ReactDOM once. All new components will need to import React*/
import './style.css'
import {
    getPosts,
    getUserInfo
} from './api/index.js'
import {
    Route,
    BrowserRouter,
    Routes,
    useNavigate
} from 'react-router-dom';
import {
    Navbar,
    Posts,
    Profile,
    Home,
    Register,
    Login,
    NewPost,
    SinglePostView,
    SendMessage,
    Search,
} from './components';
import { CssBaseline } from '@mui/material';
// import Toolbar from "@material-ui/core/Toolbar";
// import AppBar from "@material-ui/core/AppBar";
// import Typography from "@material-ui/core/Typography";
// import IconButton from "@material-ui/core/IconButton";
// import Button from "@material-ui/core/Button";
// import MenuIcon from "@material-ui/icons/Menu";

const App = () => {
    const [posts, setPosts] = useState([]);
    const [token, setToken] = useState('');
    const [user, setUser] = useState({});

    const navigate = useNavigate();

    function logout() {
        window.localStorage.removeItem('token');
        setToken('');
        setUser({});
    }

    async function fetchPosts() {
        const results = await getPosts(token)
        setPosts(results.data.posts);
    }

    async function getMe() {
        const storedToken = window.localStorage.getItem('token');

        if (!token) {
            if (storedToken) {
                setToken(storedToken);
            }
            return;
        }

        const results = await getUserInfo(token)
        if (results.success) {
            setUser(results.data);
        } else {
            console.log(results.error.message);
        }
    }

    useEffect(() => {
        fetchPosts();
    }, [token])

    useEffect(() => {
        getMe();
    }, [token])

    return (
        <div>
            <Navbar logout={logout} token={token} />
            <Routes>
                <Route
                    path='/'
                    element={<Home />} />
                <Route
                    path='/posts'
                    element={<Posts
                        posts={posts}
                        token={token} />} />
                <Route
                    exact path='/posts/new-post'
                    element={<NewPost
                        token={token}
                        navigate={navigate} />} />
                <Route
                    exact path='/posts/new-message'
                    element={<SendMessage
                        token={token}
                        navigate={navigate} />} />
                <Route
                    path='/posts/:postID'
                    element={<SinglePostView
                        posts={posts} />} />
                <Route
                    path='/profile'
                    element={<Profile
                        user={user} />} />
                <Route
                    path='/register'
                    element={<Register
                        setToken={setToken}
                        token={token}
                        navigate={navigate} />} />
                <Route
                    path='/login'
                    element={<Login
                        setToken={setToken}
                        navigate={navigate} />} />
            </Routes>
        </div>
    )
}

const container = document.querySelector('#container');
const root = ReactDOM.createRoot(container);
root.render(
    <BrowserRouter>
        <CssBaseline>
            <App />
        </CssBaseline>
    </BrowserRouter>
)

/* Components we will need for this project:
Log in
Registering new users
Posts
Profile
Navigation bar
Adding a post
May need more or less as we build
*/

/* Homework: Create the "create post" form/component (check the api - POST /posts). Will need an authorized token in order to create a post.
Create the profile page*/