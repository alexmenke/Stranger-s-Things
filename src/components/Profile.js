import React from 'react';

const Profile = ({ user }) => {
  const messages = user.messages;
  const userID = user._id;

  console.log(user)

  return (
    <div>
      <div>
        <h1>Incoming:</h1>
        {
          messages && messages.map(message => {
            const fromUserID = message.fromUser._id;
            const { username } = message.fromUser;
            const { title } = message.post;

            if (userID !== fromUserID) {
              return (
                <div key={message._id}>
                  <p>From User: {username} </p>
                  <p>Message: {message.content}</p>
                  <p>Post Reference: {title}</p>
                </div>
              )
            }
          })
        }
      </div>
      <div>
        <h1>Outgoing:</h1>
        {
          messages && messages.map(message => {
            const fromUserID = message.fromUser._id;

            if (userID === fromUserID) {
              return (
                <div key={message._id}>{message.content}
                  {/* <p>To: {message.toUser._id} </p> */}
                  {/* <p>Message: {message.content}</p>
                  <p>Post Reference: {title}</p> */}
                </div>
              )
            }
          })
        }
      </div>
    </div>
  )
}

export default Profile;