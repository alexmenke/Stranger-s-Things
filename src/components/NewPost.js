import React, { useState } from 'react';
import { addNewPost } from '../api';
import {
  Grid,
  Paper,
  TextField,
  Button,
} from '@mui/material'


const NewPost = ({ token, navigate, fetchPosts }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('On Request');
  // const [willDeliver, setWillDeliver] = useState(false);

  const addPost = async () => {
    const results = await addNewPost(token, { title, description, price, location });
    if (results.success) {
      fetchPosts();
      navigate('/posts');
    } else {
      alert('Error creating new post, please try again.')
    }
  }

  const paperStyle = {
    padding: 20,
    width: 300,
    margin: '20px auto'
  }

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <form className='newPostText' onSubmit={(event) => {
          event.preventDefault();
        }}>
          <Grid align='center'><h2>Create a new post</h2></Grid>
          <TextField
            style={{ marginBottom: '.75rem' }}
            label="Title"
            placeholder="Enter title"
            fullWidth required
            onChange={(event) => setTitle(event.target.value)} />
          <TextField
            style={{ marginBottom: '.75rem' }}
            label="Description"
            placeholder="Enter description"
            fullWidth required
            onChange={(event) => setDescription(event.target.value)} />
          <TextField
            style={{ marginBottom: '.75rem' }}
            label="Price"
            placeholder="Enter price"
            fullWidth required
            onChange={(event) => setPrice(event.target.value)} />
          <TextField
            style={{ marginBottom: '.75rem' }}
            label="Location"
            placeholder="Enter location"
            fullWidth required
            onChange={(event) => setLocation(event.target.value)} />
          <Button
            onClick={() => addPost()}
            type='submit'
            color='primary'
            variant='contained'
            fullWidth>
            Add Post
          </Button>
        </form>
      </Paper>
    </Grid>
  )
}

export default NewPost;