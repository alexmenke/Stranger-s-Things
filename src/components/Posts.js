import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardActions } from '@mui/material';
import styles from '../style.css';


const Posts = ({ posts, token }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const postMatches = (post, string) => {
    const { title, description } = post;

    if ((title.toLowerCase().includes(string.toLowerCase())) || description.toLowerCase().includes(string.toLowerCase())) {
      return post;
    }
  }

  const filteredPosts = posts.filter(post => postMatches(post, searchTerm));
  const postsToDisplay = searchTerm.length ? filteredPosts : posts;

  if (postsToDisplay.length) {
    return (
      <div id='outer div element'>
        <form onSubmit={(event) => {
          event.preventDefault();
        }}>
          <input
            type='text'
            placeholder='Enter search here...'
            onChange={(event) => setSearchTerm(event.target.value)}>
          </input>
        </form>

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
          postsToDisplay.map((post) => {
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
                        <Link to={`/posts/edit-post/${_id}`}><button>Edit Post</button></Link>
                        <Link to={`/posts/${_id}`}><button>View Post</button></Link>
                      </>
                    ) : (
                      <Link to={`/posts/${_id}`}><button>View Post</button></Link>
                    )
                  }
                </CardActions>
              </Card>
            )
          })
        }
      </div>
    )
  } else {
    return (
      <h1>Loading posts...</h1>
    )
  }

}

export default Posts;

//map through either all posts or map through all the filtered posts which are saved to a different variable.