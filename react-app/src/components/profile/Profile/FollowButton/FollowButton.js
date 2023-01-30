import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followUserThunk } from '../../../../store/follows';
import { unfollowUserThunk } from '../../../../store/follows';
import { loadFollowersThunk } from '../../../../store/follows';
import './FollowButton.css';

function FollowButton({targetUserId, followers, following}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user)

  const [targetUserFollowers, setTargetUserFollowers] = useState([]);
  const [targetUserFollowing, setTargetUserFollowing] = useState([]);

  useEffect(() => {
    if (followers) setTargetUserFollowers(Object.keys(followers).map(followerId => Number(followerId)));
    if (following) setTargetUserFollowing(Object.keys(following).map(followingId => Number(followingId)));
  }, [targetUserId, followers, following]);

  const handleFollow = async (e) => {
    e.preventDefault()
    const data = await dispatch(followUserThunk(targetUserId))
    const followData = await dispatch(loadFollowersThunk(targetUserId))
};

const handleUnfollow = async (e) => {
    e.preventDefault()
    const data = await dispatch(unfollowUserThunk(targetUserId))
    const followData = await dispatch(loadFollowersThunk(targetUserId))
    };

  if (targetUserId === user.id) {
    return <></>
} else if (targetUserFollowers.includes(Number(user.id))) {
    return <button className='profile-follow-button' onClick={handleUnfollow}>Unfollow</button>
} else if (!targetUserFollowers.includes(Number(user.id)) && targetUserFollowing.includes(Number(user.id))) {
    return <button className='profile-follow-button' onClick={handleFollow}>Follow Back</button>
} else if (!targetUserFollowers.includes(Number(user.id)) && !targetUserFollowing.includes(Number(user.id))) {
    return <button className='profile-follow-button' onClick={handleFollow}>Follow</button>
}
}

export default FollowButton;
