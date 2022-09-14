import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='home'>
    <h1>Welcome to Stranger's Things!</h1>
    <br></br>
    <h2>Create a listing and post it for others to view! See an item you like? Reach out to the seller by sending them a message!</h2>
    <br></br>
    <h2><Link to='/register'>Register</Link> or <Link to='/login'>login</Link> to share a post.</h2>
    </div>
  )
}

export default Home;