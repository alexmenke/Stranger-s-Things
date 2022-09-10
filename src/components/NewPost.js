import React, { useState } from 'react';
import { addNewPost } from '../api';


const NewPost = ({ token, navigate, fetchPosts }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('On Request');
  const [willDeliver, setWillDeliver] = useState(false);
  
  const addPost = async () => {
    const results = await addNewPost(token, {title, description, price, location, willDeliver});
    if (results.success) {
      fetchPosts();
      navigate('/posts');
    } else {
      alert('Error creating new post, please try again.')
    }
  }
  
  return (
    <form onSubmit={(event) => {
      event.preventDefault();
    }}>
      <input 
        type='text'
        placeholder='Title'
        onChange={(event) => setTitle(event.target.value)}
      />
      <input 
        type='text'
        placeholder='Description'
        onChange={(event) => setDescription(event.target.value)}
      />
      <input 
        type='text'
        placeholder='Price'
        onChange={(event) => setPrice(event.target.value)}
      />
      <input 
        type='text'
        placeholder='Location'
        onChange={(event) => setLocation(event.target.value)}
      />
      <label>Will Deliver?</label>
      <input 
          type='checkbox'
          checked=''
          onChange={(event) => setWillDeliver(event.target.check)}
        />
      <button onClick={() => addPost()}>Create New Post</button>
    </form>
  )
}

export default NewPost;