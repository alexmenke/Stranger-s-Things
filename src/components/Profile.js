import React, { useEffect } from 'react';
import {
  Paper,
  Card,
  CardContent,
} from '@mui/material';

const Profile = ({ user, getMe }) => {
  const messages = user.messages;
  const userID = user._id;

  const paperStyle = {
    padding: 20,
    width: 350,
    margin: '20px auto'
  }

  useEffect(() => {
    getMe();
}, [])

  return (
    <div className='messages'>
      <h1 className='profileHeading'>Welcome, {user.username}</h1>
      <div className='incomingMessages'>
        <Paper elevation={10} style={paperStyle}>
          <Card>
            <CardContent>
              <h1 className='messageHeaders'>Incoming Messages:</h1>
              {
                messages && messages.map(message => {
                  const fromUserID = message.fromUser._id;
                  const { username } = message.fromUser;
                  const { title } = message.post;

                  if (userID !== fromUserID) {
                    return (
                      <div key={message._id}>
                        <p>From User: {username} </p>
                        <p>Referring to: {title}</p>
                        <p>Message: {message.content}</p>
                      </div>
                    )
                  }
                })
              }
            </CardContent>
          </Card>
        </Paper>

      </div>
      <div className='outgoingMessages'>
        <Paper elevation={10} style={paperStyle}>
          <Card>
            <CardContent>
              <h1 className='messageHeaders'>Outgoing Messages:</h1>
              {
                messages && messages.map(message => {
                  const fromUserID = message.fromUser._id;
                  const { username } = message.fromUser;
                  const { title } = message.post;

                  if (userID === fromUserID) {
                    return (
                      <div key={message._id}>
                        <p>From User: {username} </p>
                        <p>Referring to: {title}</p>
                        <p>Message: {message.content}</p>
                      </div>
                    )
                  }
                })
              }
            </CardContent>
          </Card>
        </Paper>
      </div>
    </div>
  )
}

export default Profile;