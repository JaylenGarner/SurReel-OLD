import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './FollowersModalContent.css';

function FollowersModalContent({setFollowerModalIsOpen}) {
  let followers = useSelector((state) => state.follows.followers)

    if (followers) {
        return (
          <div>
              {Object.values(followers).map((follower) => {
                  return (
                  <div className='followers-modal-user-container' key={follower.id}>
                      <NavLink  className='followers-modal-nav-link' to={`/users/${follower.id}/profile`} onClick={() => setFollowerModalIsOpen(false)}>
                        <img className='followers-modal-user-image' src={follower.image}></img>
                      </NavLink>
                      <NavLink  className='followers-modal-nav-link' to={`/users/${follower.id}/profile`} onClick={() => setFollowerModalIsOpen(false)}>
                        <span className='followers-modal-username'>{follower.username}</span>
                      </NavLink>
                  </div>
                  )
              })}
          </div>
        )
    }
}

export default FollowersModalContent;
