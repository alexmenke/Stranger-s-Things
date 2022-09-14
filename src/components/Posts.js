import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Paper,
  Button,
  Card,
  CardContent,
  CardActions,
  TextField,
  Grid,
} from '@mui/material';
import styles from '../style.css';

const Posts = ({ posts, token, fetchPosts }) => {
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
    margin: '1rem auto'
  }

  useEffect(() => {
    fetchPosts();
}, [token])

  return (
    <div className='postContainer'>
      <Grid
        container
        gap={'2rem'}
        direction="row"
        alignItems="flex-start"
        justifyContent='center'
        justify='flex-start'>
        <div className='postHeader'>
          <form onSubmit={(event) => {
            event.preventDefault();
          }}>
            <TextField
              style={{ margin: '.50rem' }}
              className='searchBar'
              type='text'
              placeholder='Enter search here...'
              onChange={(event) => setSearchTerm(event.target.value)}>
            </TextField>
          </form>

          {
            token ? (
              <Link to='/posts/new-post'>
                <Button
                  style={{
                    margin: '.50rem',
                    backgroundColor: '#FB9039',
                    color: '#646C79'
                  }}
                  className='newPostButton'
                  variant='contained'>
                  Create New Post
                </Button>
              </Link>
            ) : (
              <p><Link to='/register'>Register</Link> or <Link to='/login'>login</Link> to create a post.</p>
            )
          }
        </div>
      </Grid>

      {
        postsToDisplay.map((post) => {
          const { description, location, price, title, _id, isAuthor } = post;
          return (
            <div className='posts'
              key={_id}>
              <Grid
                container
                gap={'20rem'}
                direction="row"
                alignItems="flex-start"
                justifyContent='center'
                justify='flex-start'>
                <Paper elevation={10} style={paperStyle}>
                  <Card
                    className={styles.singlePost}>
                    <CardContent>
                      <h3 className='postTitle'>{title}</h3>
                      <p className='postInfo'>Description: {description}</p>
                      <p className='postInfo'>Price: {price}</p>
                      <p className='postInfo'>Location: {location}</p>
                      <CardActions>
                        {
                          isAuthor ? (
                            <>
                              <Link to={`/posts/edit-post/${_id}`}>
                                <Button style={{color: '#FB9039'}}>
                                  Edit Post
                                </Button>
                              </Link>
                              <Link to={`/posts/${_id}`}>
                                <Button style={{color: '#FB9039'}}>
                                  View Post
                                </Button>
                              </Link>
                            </>
                          ) : (
                            <Link to={`/posts/${_id}`}>
                              <Button style={{color: '#FB9039'}}>
                                View Post
                              </Button>
                            </Link>
                          )
                        }
                      </CardActions>
                    </CardContent>
                  </Card>
                </Paper>
              </Grid>
            </div>
          )
        })
      }
    </div>
  )
}

export default Posts;
