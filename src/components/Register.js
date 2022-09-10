import React, { useState } from 'react';
import { registerUser } from '../api';

const Register = ({ setToken, navigate }) => {
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
    const results = await registerUser(username, password);
    if (results.success) {
      setToken(results.data.token);
      window.localStorage.setItem('token', results.data.token);
      navigate('/profile');
    } else {
      console.log(error.message)
    }
  }

  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      verifyPassword()
    }}>
      <input
        type='text'
        placeholder='Enter username'
        onChange={(event) => setUsername(event.target.value)}
      />
      <input
        type='password'
        placeholder='Enter password'
        onChange={(event) => setPassword(event.target.value)}
      />
      <input
        type='password'
        placeholder='Confirm password'
        onChange={(event) => setConfirmPassword(event.target.value)}
      />
      <button type='submit'>Create account</button>
    </form>
  )
}

export default Register;