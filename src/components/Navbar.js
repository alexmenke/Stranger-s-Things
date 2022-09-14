import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
} from "@mui/material";
import '../style.css'

const Navbar = ({ logout, token }) => {
  return (
    <div className='header'>
      <h2 className='companyName'>Stranger's Things</h2>
      <nav>
        <Link to='/'>
          <Button
            className='navButtons'>
            Home
          </Button>
        </Link>
        <Link to='/posts'>
          <Button
            className='navButtons'>
            Posts
          </Button>
        </Link>
        {
          token ? (
            <>
              <Link to='/profile'>
                <Button className='navButtons'>
                  Profile
                </Button>
              </Link>
              <Link to='/' onClick={() => logout()}>
                <Button
                  className='navButtons'>
                  Logout
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to='/register'>
                <Button
                  className='navButtons'>
                  New Account
                </Button>
              </Link>
              <Link to='/login'>
                <Button
                  className='navButtons'>
                  Sign In
                </Button>
              </Link>
            </>
          )
        }
      </nav>
    </div>
  )
}

export default Navbar;