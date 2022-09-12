import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Paper,
  Button,
  Card,
  CardContent,
  CardActions,
  TextField,
} from '@mui/material';
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

  const paperStyle = {
    padding: 20,
    width: 350,
    margin: '20px auto'
  }

  if (postsToDisplay.length) {
    return (
      <div className='postContainer'>
        <div className='postHeader'>
          <form onSubmit={(event) => {
            event.preventDefault();
          }}>
            <TextField
              className='searchBar'
              type='text'
              placeholder='Enter search here...'
              onChange={(event) => setSearchTerm(event.target.value)}>
            </TextField>
          </form>

          {
            token ? (
              <Link to='/posts/new-post'>
                <Button className='newPostButton' variant='contained'>Create New Post</Button>
              </Link>
            ) : (
              <p><Link to='/register'>Register</Link> or <Link to='/login'>login</Link> to create a post.</p>
            )
          }
        </div>

        {
          postsToDisplay.map((post) => {
            const { description, location, price, title, willDeliver, _id, isAuthor } = post;
            return (
              <div className='posts'
                key={_id}>
                <Paper elevation={10} style={paperStyle}>
                  <Card
                    className={styles.singlePost}>
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
                            <Link to={`/posts/edit-post/${_id}`}><Button>Edit Post</Button></Link>
                            <Link to={`/posts/${_id}`}><Button>View Post</Button></Link>
                          </>
                        ) : (
                          <Link to={`/posts/${_id}`}><Button>View Post</Button></Link>
                        )
                      }
                    </CardActions>
                  </Card>
                </Paper>
              </div>
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
