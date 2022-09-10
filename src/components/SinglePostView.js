import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, CardContent, CardActions } from '@mui/material';
import { deletePost, createMessage } from '../api';

const SendMessage = ({ postID, token }) => {
    const [message, setMessage] = useState({ content: '' });

    async function addMessage() {
        await createMessage({ postID, message, token })
    }

    // we need three things to make this request. postID, token, message object containing the content of the message.

    return (
        <form onSubmit={(event) => {
            event.preventDefault();
            addMessage();
            //will need to call the getMe function to populate the profile page with the new messages.
        }}>
            <input
                type='text'
                placeholder='Write message here'
                onChange={(event) => setMessage({ content: event.target.value })}
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
                {/* <button onClick={() => setActivateMessage(!activateMessage)}>Write a message</button>
                {
                    activateMessage && <SendMessage postID={postID} token={token} />
                } */}
                {
                    // token &&
                    isAuthor ? (
                        <>
                            <Link to={`/posts`}><button>View All</button></Link>
                            <Link to={`/posts`}><button onClick={() => deletePost(token, _id)}>Delete</button></Link>
                        </>

                    ) : (

                             <>
                                <Link to={`/posts`}><button>View All</button></Link>
                                { token && 
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
            {/* {
                    { token } ? (

                    ) : (

                    )
                } */}
        </CardActions>
        </Card >
    )
}

export default SinglePostView;

//isLoggedIn with boolean. Change to true everyt