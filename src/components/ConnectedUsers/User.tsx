import React from 'react'

const User = (props: {user: { id: string; username: string }}) => {
  return (
    <li className='connected-user'>
        <img src="/assets/user.png" alt="User foto" />
        <span>{props.user.username}</span>
    </li>
  )
}

export default User