import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './UsersList.css'

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  const userComponents = users.map((user) => {
    return (
      <div key={user.id} className='user-info-container'>
        <div className='user-list-image-container'>
        <NavLink to={`/users/${user.id}/profile`}><img src={user.image} className='user-list-image'></img></NavLink>
        </div>
        <NavLink to={`/users/${user.id}/profile`} className='users-list-username'>{user.username}</NavLink>
      </div>
    );
  });

  return (
    <div style={{'margin-left': '240px'}}>
      <h1 className='user-list-heading'>All Users</h1>
      {userComponents}
    </div>
  );
}

export default UsersList;
