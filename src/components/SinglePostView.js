import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, CardContent, CardActions } from '@mui/material';
import { deletePost, createMessage } from '../api';

const SendMessage = ({ postID, token, getMe }) => {
    const [message, setMessage] = useState({ content: '' });

    async function addMessage() {
        await createMessage({ postID, message, token })
    }

    return (
        <form onSubmit={(event) => {
            event.preventDefault();
            addMessage();
            getMe();
        }}>
            <input
                type='text'
                placeholder='Write message here'
                onChange={(event) => setMessage({ content: event.target.value })}
            />
            <Link to='/profile'><button type='submit'>Send</button></Link>
        </form>
    )
}

const SinglePostView = ({ posts, token }) => {
    const [activateMessage, setActivateMessage] = useState(false)
    const { postID } = useParams();

    if (posts.length) {
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
                    {
                        isAuthor ? (
                            <>
                                <Link to={`/posts`}><button>View All</button></Link>
                                <Link to={`/posts`}><button onClick={() => deletePost(token, _id)}>Delete</button></Link>
                            </>
                        ) : (
                            <>
                                <Link to={`/posts`}><button>View All</button></Link>
                                {token &&
                                    <>
                                        <button onClick={() => setActivateMessage(!activateMessage)}>Write a message</button>
                                        {
                                            activateMessage && <SendMessage postID={postID} token={token} />
                                        }
                                    </>
                                }
                            </>
                        )
                    }
                </CardActions>
            </Card >
        )
    } else {
        return (
            <h1>Loading post...</h1>
        )
    }

}

export default SinglePostView;
