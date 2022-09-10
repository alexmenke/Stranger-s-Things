import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, CardContent, CardActions } from '@mui/material';
import { deletePost } from '../api';

const SinglePostView = ({ posts, token }) => {
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
            {
                  isAuthor ? (
                    <>
                    <Link to={`/posts`}><button>View All</button></Link>
                    <Link to={`/posts`}><button onClick={() => deletePost(token, _id)}>Delete</button></Link>
                    </>
                    ) : (
                    <>
                      <Link to={`/posts`}><button>View All</button></Link>
                      <Link to={`/posts/new-message`}><button>Send Message</button></Link>
                    </>
                  )
                }
            </CardActions>
        </Card>
    )
}

export default SinglePostView;