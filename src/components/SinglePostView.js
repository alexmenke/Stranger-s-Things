import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
    Paper,
    Card,
    CardContent,
    CardActions,
    Button,
    TextField,
} from '@mui/material';
import { deletePost, createMessage } from '../api';
import styles from '../style.css';

const SendMessage = ({ postID, token }) => {
    const [message, setMessage] = useState({ content: '' });
    const navigate = useNavigate();

    async function addMessage() {
        
        const response = await createMessage({ postID, message, token })
        console.log(response)
    }

    return (
        <form onSubmit={(event) => {
            event.preventDefault();
            addMessage();
            navigate(`/posts`)
        }}>
            <TextField
                type='text'
                placeholder='Write message here'
                onChange={(event) => setMessage({ content: event.target.value })}
            />
            <Button variant='contained' type='submit'>Send</Button>
        </form>
    )
}

const SinglePostView = ({ posts, token }) => {
    const [activateMessage, setActivateMessage] = useState(false)
    const { postID } = useParams();
    const paperStyle = {
        padding: 20,
        margin: '20px auto'
    }

    if (posts.length) {
        const [currentPost] = posts.filter(post => post._id === postID);
        const { title, description, location, price, willDeliver, _id, isAuthor } = currentPost;

        return (
            <Paper elevation={10} style={paperStyle}>
                <Card>
                    <CardContent>
                        <h3 className='postTitle'>{title}</h3>
                        <p className='postInfo'>Description: {description}</p>
                        <p className='postInfo'>Price: {price}</p>
                        <p className='postInfo'>Location: {location}</p>
                        <p className='postInfo'>Delivery: {willDeliver}</p>
                    </CardContent>
                    <CardActions>
                        {
                            isAuthor ? (
                                <>
                                    <Link to={`/posts`}><Button>View All</Button></Link>
                                    <Link to={`/posts`}><Button onClick={() => deletePost(token, _id)}>Delete</Button></Link>
                                </>
                            ) : (
                                <>
                                    <Link to={`/posts`}><Button>View All</Button></Link>
                                    {token &&
                                        <>
                                            <Button onClick={() => setActivateMessage(!activateMessage)}>Write a message</Button>
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
            </Paper>
        )
    } else {
        return (
            <h1>Loading post...</h1>
        )
    }

}

export default SinglePostView;
