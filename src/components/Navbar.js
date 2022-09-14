import React from 'react';
import { Link } from 'react-router-dom';
import '../style.css'
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  Grid,
  Button,
} from '@mui/material';

const Navbar = ({ logout, token }) => {
  return (
    <AppBar
      position='static'
      style={{ backgroundColor: '#1F3044' }}>
      <CssBaseline>
        <Toolbar>
          <Grid container>
            <Typography
              type="title"
              style={{ 
                fontSize: '1.75rem',
                color: '#FB9039' }}>
              Stranger's Things
            </Typography>
          </Grid>
          <Grid container
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end">
            <Typography>
              <Link to='/'><Button
                style={{
                  margin: '.10rem',
                  color: '#FB9039',
                }}>
                Home
              </Button></Link>
              <Link to='/posts'><Button
                style={{
                  margin: '.10rem',
                  color: '#FB9039',
                }}>
                Posts
              </Button></Link>
              {
                token ? (
                  <>
                    <Link to='/profile'><Button
                      style={{
                        margin: '.10rem',
                        color: '#FB9039',
                      }}>
                      Profile
                    </Button></Link>
                    <Link to='/' onClick={() => logout()}><Button
                      style={{
                        margin: '.10rem',
                        color: '#FB9039',
                      }}>
                      Logout
                    </Button></Link>
                  </>
                ) : (
                  <>
                    <Link to='/register'><Button
                      style={{
                        margin: '.10rem',
                        color: '#FB9039',
                      }}>
                      New Account
                    </Button></Link>
                    <Link to='/login'><Button
                      style={{
                        margin: '.10rem',
                        color: '#FB9039',
                      }}>
                      Sign In
                    </Button></Link>
                  </>
                )
              }
            </Typography>
          </Grid>
        </Toolbar>
      </CssBaseline>
    </AppBar>
  )
}

export default Navbar;