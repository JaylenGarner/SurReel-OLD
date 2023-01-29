import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadLikesThunk } from '../../store/likes';
import '../profile/FollowModalContent/FollowersModalContent.css'

const LikesModalContent = ({setModalIsOpen, postId, postPage}) => {
    const dispatch = useDispatch()
    const posts = useSelector((state) => state.posts)
    let post = posts[postId]

    useEffect(() => {
        // dispatch(loadLikesThunk(postId));
      }, [dispatch]);

      if (postPage) {
        return (
          <div>
                    {Object.values(posts.post.likes).map((like) => {
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
                    })}
                </div>
        )
      }

            return (
                <div>
                    {Object.values(post.likes).map((like) => {
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
                    })}
                </div>
              )


}

export default LikesModalContent;
