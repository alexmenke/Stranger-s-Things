import React from 'react';
import { Link } from 'react-router-dom';
import { deletePost } from '../api';
import { Card, CardContent, CardActions } from '@mui/material';
import styles from '../style.css';


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
            <Card
              className={styles.singlePost}
              key={_id}>
              <CardContent>
                <h3>{title}</h3>
                <p>Description: {description}</p>
                <p>Price: {price}</p>
                <p>Location: {location}</p>
                <p>Delivery: {willDeliver}</p>
              </CardContent>
              <CardActions>
                {
                  isAuthor ? (
                    <>
                    <Link to={`/posts/${_id}`}><button>View Post</button></Link>
                    <Link to={`/posts`}><button onClick={() => deletePost(token, _id)}>Delete</button></Link>
                    </>
                    ) : (
                    <>
                      <Link to={`/posts/${_id}`}><button>View Post</button></Link>
                      <Link to={`/posts/new-message`}><button>Send Message</button></Link>
                    </>
                  )
                }
              </CardActions>
            </Card>
          )
        })
      }
    </div>
  )
}

export default Posts;