import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updatePost } from '../api'


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

    return (
        <form onSubmit={(event) => {
            event.preventDefault();
            editPost();
            fetchPosts();
            navigate('/posts');
        }}>
            <input
                type='text'
                placeholder={title}
                onChange={(event) => setNewTitle(event.target.value)}
            />
            <input
                type='text'
                placeholder={description}
                onChange={(event) => setNewDescription(event.target.value)}
            />
            <input
                type='text'
                placeholder={price}
                onChange={(event) => setNewPrice(event.target.value)}
            />
            <input
                type='text'
                placeholder={location}
                onChange={(event) => setNewLocation(event.target.value)}
            />
            <label>Will Deliver?</label>
            <input
                type='checkbox'
                checked={newWillDeliver}
                onChange={(event) => setNewWillDeliver(event.target.checked)}
            />
            <button type='submit'>Update</button>
            <Link to={`/posts`}><button onClick={() => deletePost(token, _id)}>Delete</button></Link>
        </form>
    )
}

export default EditPost;