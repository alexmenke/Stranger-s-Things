import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='home'>
    <h1>Welcome to Stranger's Things!</h1>
    <h2><Link to='/register'>Register</Link> or <Link to='/login'>login</Link> to create a post.</h2>
    </div>
  )
}

export default Home;