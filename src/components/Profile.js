import React from 'react';

const Profile = ({ user }) => {
    return (
        <h1>Welcome, {user.username}</h1>
    )
}

export default Profile;