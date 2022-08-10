import React from 'react'
import User from './User';

const ConnectedUsers = (props: {ConnectedUsers: { id: string; username: string }[]}) => {
  return (
    <div className='connected-users'>
        <h2>Connected Users</h2>

        <ul>
            {props.ConnectedUsers.map(user => (
                <User key={user.id} user={user} />
            ))}
        </ul>
    </div>
  )
}

export default ConnectedUsers