import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './FollowersModalContent.css';

function FollowersModalContent() {
  let followers = useSelector((state) => state.follows.followers)
  let test = [1, 2, 3, 4, 5, 6, 7, 8 ,9, 10]


    if (followers) {
        return (
          <div>
              {Object.values(followers).map((follower) => {
                  return (
                  <div className='followers-modal-user-container'>
                      <img className='followers-modal-user-image' src={follower.image}></img>
                      <span className='followers-modal-username'> {follower.username}</span>
                  </div>
                  )
              })}
          </div>
        )
    }
}

export default FollowersModalContent;
