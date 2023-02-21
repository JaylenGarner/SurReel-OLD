import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadLikesThunk } from '../../store/likes';
import '../test/FollowModalContent/FollowersModalContent.css'

const LikesModalContent = ({setModalIsOpen, postId}) => {
    const dispatch = useDispatch()
    const likes = useSelector((state) => state.likes)

  useEffect(() => {
    // if (!likes) {
      dispatch(loadLikesThunk(postId));
    // }
  }, [dispatch]);

    return (
      <div>
        {Object.values(likes).map((like) => {

          if (like.post_id == postId) {
            return (
              <div className='followers-modal-user-container' key={like.id}>
                <NavLink  className='followers-modal-nav-link' to={`/users/${like.user.id}/profile`} onClick={() => setModalIsOpen(false)}>
                  <img className='followers-modal-user-image' src={like.user.image}></img>
                </NavLink>
                <NavLink  className='followers-modal-nav-link' to={`/users/${like.user.id}/profile`} onClick={() => setModalIsOpen(false)}>
                  <span className='followers-modal-username'>{like.user.username}</span>
                </NavLink>
              </div>
            )
          }
        })}
      </div>
    )
  }

export default LikesModalContent;
