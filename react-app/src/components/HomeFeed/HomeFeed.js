import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { loadFeedPostsThunk } from '../../store/posts';
import LikesModalContent from '../Likes/LikesModalContent';
import Modal from 'react-modal'
import './HomeFeed.css'


function HomeFeed() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user)
  const posts = useSelector((state) => state.posts)
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState()



  useEffect(() => {
    dispatch(loadFeedPostsThunk(user.id));
  }, [dispatch]);

  if (!user) {
    return null;
  }

  if (!Object.values(posts).length) {
    return <h1>There are no posts in your feed. Get started by following other users</h1>
  } else {
      return (
       <div className='home-page-feed-container'>
        {posts && Object.values(posts).map((post) => {
            return <div key={post.id} className='home-feed-post-container'>
                <div className='home-feed-post-owner-info-container'>
                <NavLink to={`/users/${post.owner.id}/profile`}><img src={post.owner.image} className='home-feed-post-owner-image'></img></NavLink>
                <NavLink className='owner-info-nav-link-text' to={`/users/${post.owner.id}/profile`}><span className='home-feed-post-owner-username'>{post.owner.username}</span></NavLink>
                </div>
                <img src={post.media} className='home-feed-post-image'></img>
                <div className='home-feed-post-interaction-area'>
                <span onClick={() => {
                  setCurrentPost(post.id)
                  setModalIsOpen(true)
                  }}>Likes</span>
                <Modal
              isOpen={modalIsOpen}
              style={{
                content: {
                  width: '400px',
                  height: '400px',
                  top: '18%',
                  left: '42%',
                  backgroundColor: '#262626',
                  color: 'white',
                }
              }}
              >
                <div className='profile-following-modal-header-container'>
                  <span className='profile-following-modal-header-text'>Likes</span>
                </div>
                <button onClick={() => setModalIsOpen(false)} className='profile-following-modal-close-button'>X</button>
                <LikesModalContent setModalIsOpen={setModalIsOpen} postId={currentPost}/>
             </Modal>
                <span>{post.caption}</span>
                </div>
            </div>
        })}
        <div className='home-page-info-area'>
            <NavLink to={`/users/${user.id}/profile`}><img src={user.image} className='home-page-info-area-user-image'></img></NavLink>
            <NavLink className='home-page-info-nav-link-text' to={`/users/${user.id}/profile`}><span className='home-page-info-area-username'>{user.username}</span></NavLink>
            </div>
       </div>
      );
  }

}
export default HomeFeed;
