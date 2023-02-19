import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './FollowersModalContent.css';

function FollowingModalContent({setFollowingModalIsOpen}) {
  let following = useSelector((state) => state.following)

    if (following) {
        return (
          <div>
              {Object.values(following).map((followee) => {
                  return (
                  <div className='followers-modal-user-container' key={followee.id}>
                      <NavLink  className='followers-modal-nav-link' to={`/users/${followee.id}/profile`} onClick={() => setFollowingModalIsOpen(false)}>
                        <img className='followers-modal-user-image' src={followee.image}></img>
                      </NavLink>
                      <NavLink  className='followers-modal-nav-link' to={`/users/${followee.id}/profile`} onClick={() => setFollowingModalIsOpen(false)}>
                        <span className='followers-modal-username'>{followee.username}</span>
                      </NavLink>
                  </div>
                  )
              })}
          </div>
        )
    }
}

export default FollowingModalContent;
