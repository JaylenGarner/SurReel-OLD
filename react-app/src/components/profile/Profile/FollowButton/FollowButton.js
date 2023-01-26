import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './FollowButton.css';


function FollowButton({targetUserId, followers, following}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user)

  const [targetUserFollowers, setTargetUserFollowers] = useState([]);
  const [targetUserFollowing, setTargetUserFollowing] = useState([]);

  useEffect(() => {
    if (followers) {
        setTargetUserFollowers(Object.keys(followers).map(followerId => Number(followerId)));
      }

    if (following) {
        setTargetUserFollowing(Object.keys(following).map(followingId => Number(followingId)));
    }

  }, [targetUserId, followers, following]);



  if (targetUserId === user.id) {
    return <></>
} else if (targetUserFollowers.includes(Number(user.id))) {
    return <button className='profile-follow-button'>Unfollow</button>
} else if (!targetUserFollowers.includes(Number(user.id)) && targetUserFollowing.includes(Number(user.id))) {
    return <button className='profile-follow-button'>Follow Back</button>
} else if (!targetUserFollowers.includes(Number(user.id)) && !targetUserFollowing.includes(Number(user.id))) {
    return <button className='profile-follow-button'>Follow</button>
}
}

export default FollowButton;
