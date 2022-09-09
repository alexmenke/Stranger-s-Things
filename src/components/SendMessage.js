import React from 'react';
import { Link } from 'react-router-dom';

const SendMessage = ({ token, navigate }) => {
    const sendNewMessgage = () => {

    }

    return (
        <form onSubmit={(event) => {
            event.preventDefault();
        }}>
            <input
                type='text'
                placeholder='Type message here'
            />
            <Link to='/posts'><button>Send</button></Link>
        </form>
    )
}

export default SendMessage;