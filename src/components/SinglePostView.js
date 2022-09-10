import React, {useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, CardContent, CardActions } from '@mui/material';
import { deletePost } from '../api';

const SendMessage = ({ postID }) => {
    const [message, setMessage] = useState({content: ''});

    // we need three things to make this request. postID, token, message object containing the content of the message.

    return (
        <form onSubmit={(event) => {
            event.preventDefault();
            
        }}>
            <input
                type='text'
                placeholder='Write message here'
                onChange={(event) => setMessage({content: event.target.value})}
            />
            <button type='submit'>Send</button>
        </form>
    )
}

const SinglePostView = ({ posts, token }) => {
    const [activateMessage, setActivateMessage] = useState(false)
    const { postID } = useParams();

    const [currentPost] = posts.filter(post => post._id === postID);

    const { title, description, location, price, willDeliver, _id, isAuthor } = currentPost;

    return (
        <Card>
            <CardContent>
                <h3>{title}</h3>
                <p>Description: {description}</p>
                <p>Price: {price}</p>
                <p>Location: {location}</p>
                <p>Will Deliver: {willDeliver}</p>
            </CardContent>
            <CardActions>
                <button onClick={() => setActivateMessage(!activateMessage)}>Write a message</button>
                {
                    activateMessage && <SendMessage postID={postID}/>
                }
                {
                    isAuthor ? (
                        <>
                            <Link to={`/posts`}><button>View All</button></Link>
                            <Link to={`/posts`}><button onClick={() => deletePost(token, _id)}>Delete</button></Link>
                        </>
                    ) : (
                        <>
                            <Link to={`/posts`}><button>View All</button></Link>
                        </>
                    )
                }
            </CardActions>
        </Card>
    )
}

export default SinglePostView;