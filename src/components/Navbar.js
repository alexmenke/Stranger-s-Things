import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ logout, token }) => {
  return (
    <header>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/posts'>Posts</Link>
        {
          token ? (
            <>
              <Link to='/profile'>Profile</Link>
              <Link to='/' onClick={() => logout()}>Logout</Link>
            </>
          ) : (
            <>
              <Link to='/register'>New Account</Link>
              <Link to='/login'>Sign In</Link>
            </>
          )
        }
      </nav>
    </header>
  )
}

export default Navbar;