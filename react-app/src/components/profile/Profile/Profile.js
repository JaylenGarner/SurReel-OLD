import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfilePosts from '../ProfilePosts/ProfilePosts';
import { loadFollowersThunk } from '../../../store/follows';
import { loadFollowingThunk } from '../../../store/follows';
import FollowButton from './FollowButton/FollowButton';
import './Profile.css';

function Profile() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  let posts = useSelector((state) => state.posts)
  let followers = useSelector((state) => state.follows.followers)
  let following = useSelector((state) => state.follows.following)

  const [followLength, setFollowLength] = useState(0)

  useEffect(() => {

    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();

    dispatch(loadFollowersThunk(userId))
    dispatch(loadFollowingThunk(userId))

  }, [userId, dispatch]);

  if (!user) return null;
  if (!posts) posts = 0
  if (!followers) followers = 0
  if (!following) following = 0
  // if (followers) setFollowLength(Object.keys(followers).length)

  return (
    <div className='profile-container'>
        <div className='profile-info-area'>
          <div className='profile-user-image-container'>
            <img src={user.image} className='profile-user-image'></img>
          </div>
            <div>
              <div className='profile-user-username-container'>
            <span className='profile-user-username'>{user.username}</span>
             <FollowButton targetUserId={user.id} followers={followers} following={following} />
            </div>
            <div className='profile-stats-area'>
              {posts && <div>
                <span className='profile-count-numbers'>{Object.keys(posts).length} </span>
                <span className='profile-count-labels'>posts </span>
              </div>}
              {followers && <div>
                <span className='profile-count-numbers'>{Object.keys(followers).length} </span>
                <span className='profile-count-labels'>followers </span>
              </div>}
              {following && <div>
                <span className='profile-count-numbers'>{Object.keys(following).length} </span>
                <span className='profile-count-labels'>following </span>
              </div>}
              </div>
            </div>
        </div>
        <div className='profile-border-container'><div className='profile-border'></div></div>
        <ProfilePosts />
    </div>
  );
}
export default Profile;
