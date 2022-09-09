import React from 'react';
import { Link } from 'react-router-dom';
import { deletePost } from '../api';


const Posts = ({ posts, token }) => {
  return (
    <div id='outer div element'>
      {
        token ? (
          <Link to='/posts/new-post'>
            <button>Create New Post</button>
          </Link>
        ) : (
          <p><Link to='/register'>Register</Link> or <Link to='/login'>login</Link> to create a post.</p>
        )
      }
      {
        posts.map((post) => {
          const { description, location, price, title, willDeliver, _id, isAuthor } = post;
          return (
            <div key={_id}>
              <h3>{title}</h3>
              <p>Description: {description}</p>
              <p>Price: {price}</p>
              <p>Location: {location}</p>
              <p>Delivery: {willDeliver}</p>
              {
                isAuthor ? (
                  <button onClick={() => deletePost(token, _id)}>Delete</button>
                ) : (
                  <Link to={`/posts/${_id}`}><button>View</button></Link>
                )
              }
            </div>
          )
        })
      }
    </div>
  )
}

export default Posts;