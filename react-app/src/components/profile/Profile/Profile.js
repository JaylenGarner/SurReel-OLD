import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProfilePosts from '../ProfilePosts/ProfilePosts';
import './Profile.css';

function Profile() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <div className='profile-container'>
        <div className='profile-info-area'>
            <img src={user.image} className='profile-user-image'></img>
            <span className='profile-user-username'>{user.username}</span>
        </div>
        <div className='profile-border-container'><div className='profile-border'></div></div>
        <ProfilePosts />
    </div>
  );
}
export default Profile;
