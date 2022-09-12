import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deletePost, updatePost } from '../api'
import {
    Grid,
    Paper,
    TextField,
    Button
  } from '@mui/material'


const EditPost = ({ posts, token, fetchPosts }) => {
    const { postID } = useParams();
    const [currentPost] = posts.filter(post => post._id === postID);
    const { title, description, location, price, willDeliver } = currentPost;

    const [newTitle, setNewTitle] = useState(title);
    const [newDescription, setNewDescription] = useState(description);
    const [newPrice, setNewPrice] = useState(price);
    const [newLocation, setNewLocation] = useState(location);
    const [newWillDeliver, setNewWillDeliver] = useState(willDeliver);

    const navigate = useNavigate();

    async function editPost() {
        const updatedPost = {
            token: token,
            title: newTitle,
            description: newDescription,
            price: newPrice,
            location: newLocation,
            willDeliver: newWillDeliver,
            _id: postID
        }
        await updatePost(updatedPost);
    }

    const paperStyle = {
        padding: 20,
        height: '70vh',
        width: 300,
        margin: '20px auto'
      }

    return (
        <Grid>
        <Paper elevation={10} style={paperStyle}>
        <form onSubmit={(event) => {
            event.preventDefault();
            editPost();
            fetchPosts();
            navigate('/posts');
        }}>
            <Grid align='center'><h2>Edit post</h2></Grid>
            <TextField placeholder={title} fullWidth required onChange={(event) => setNewTitle(event.target.value)} />
            <TextField placeholder={description} fullWidth required onChange={(event) => setNewDescription(event.target.value)} />
            <TextField placeholder={price} fullWidth required onChange={(event) => setNewPrice(event.target.value)}/>
            <TextField placeholder={location} fullWidth required onChange={(event) => setNewLocation(event.target.value)}/>
            <Button type='submit' color='primary' variant='contained' fullWidth>Update</Button>
            <Button type='submit' onClick={() => deletePost(token, postID)} color='primary' variant='contained' fullWidth>Delete</Button>
          </form>
        </Paper>
      </Grid>
    )
}

export default EditPost;