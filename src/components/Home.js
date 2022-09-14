import React from 'react';
import { Link } from 'react-router-dom';
import {
  Paper,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';

const Home = () => {
  const paperStyle = {
    padding: 20,
    margin: '20px auto'
  }

  return (
    <div className='home'>
      <Paper elevation={10} style={paperStyle}>
        <Card>
          <CardContent>
            <h1 className='homeHeading'>Welcome to Stranger's Things!</h1>
            <h2>Create a listing and post it for others to view! See an item you like? Reach out to the seller by sending them a message!</h2>
            <CardActions>
              <Link to='/register'>
                <Button
                  style={{
                    margin: '.50rem',
                    color: '#FB9039'
                  }}>
                  Register
                </Button>
              </Link>
              <Link to='/login'>
                <Button
                  style={{
                    margin: '.50rem',
                    color: '#646C79',
                    backgroundColor: '#FB9039'
                  }}
                  variant='contained'>
                  Login
                </Button>
              </Link>
            </CardActions>
          </CardContent>
        </Card>
      </Paper>
    </div>
  )
}

export default Home;