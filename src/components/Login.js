import React, { useState } from 'react';
import { loginUser } from '../api';
import {
  Grid,
  Paper,
  TextField,
  Button
} from '@mui/material'

const Login = ({ setToken, navigate }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const verifyPassword = () => {
    if (password === confirmPassword) {
      handleSubmit();
    } else {
      alert("Passwords do not match, please try again.")
    }
  }

  const handleSubmit = async () => {
    const results = await loginUser(username, password);
    if (results.success) {
      setToken(results.data.token);
      window.localStorage.setItem('token', results.data.token);
      navigate('/profile');
    } else {
      console.log(error.message)
    }
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
          verifyPassword();
        }}>
          <Grid align='center'><h2>Sign In</h2></Grid>
          <TextField label="Username" placeholder="Enter username" fullWidth required onChange={(event) => setUsername(event.target.value)} />
          <TextField label="Password" placeholder="Enter password" type='password' fullWidth required onChange={(event) => setPassword(event.target.value)} />
          <TextField label="Confirm password" placeholder="Confirm password" type='password' fullWidth required onChange={(event) => setConfirmPassword(event.target.value)} />
          <Button type='submit' color='primary' variant='contained' fullWidth>SIGN IN</Button>
        </form>
      </Paper>
    </Grid>
  )
}

export default Login;
