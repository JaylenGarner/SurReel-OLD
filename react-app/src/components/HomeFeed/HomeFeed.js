import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { loadFeedPostsThunk } from '../../store/posts';
import LikesModalContent from '../Likes/LikesModalContent';
import { likePostThunk, loadLikesThunk } from '../../store/likes';
import { unlikePostThunk } from '../../store/likes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartFilled } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal'
import './HomeFeed.css'
import { loadFollowingThunk } from '../../store/following';

import { likeHelper } from '../../utils/likes/likeHelper';

function HomeFeed() {
  const dispatch = useDispatch();
  const history = useHistory()

  const user = useSelector((state) => state.session.user)
  const posts = useSelector((state) => state.posts)
  const likes = useSelector((state) => state.likes)
  const following = useSelector((state) => state.following)
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState()
  const [postLikes, setPostLikes] = useState({});


  useEffect(() => {

    if (user) {
      dispatch(loadFeedPostsThunk(user.id));
      dispatch(loadFollowingThunk(user.id));
    }

  }, [dispatch]);

  const isLiked = (post) => {

    if (user && likes && post) {
      const myLike = likeHelper(user.id, post.id, likes)

    // Liked
    if (myLike) {
      return (
        <button className="like-button" onClick={(e) => handleUnlike(e, post.id)}>
          <FontAwesomeIcon icon={faHeartFilled} />
        </button>)
      }
      // Not liked
      return (
        <button className="like-button-empty" onClick={(e) => handleLike(e, post.id)}>
          <FontAwesomeIcon icon={faHeartFilled} />
        </button>
      )
    }
  }

  const handleLike = async (e, postId) => {
    e.preventDefault()
    const data = await dispatch(likePostThunk(postId))
  };

  const handleUnlike = async (e, postId) => {
    e.preventDefault()

    const like = likeHelper(user.id, postId, likes)

    if (user && likes && like) {
      const data = await dispatch(unlikePostThunk(postId, like.id))
    }
  };

  const filterPosts = () => {
    const userIds = []

    if (following && Object.values(following).length) {
      const users = Object.values(following);
      users.forEach((user) => {
        if (!userIds.includes(user.id)) userIds.push(user.id)
      })
    }

    if (posts && Object.values(posts).length) {
      const values = Object.values(posts);
      const filteredPosts = values.filter((post) => {
        return userIds.includes(post.owner_id)
      });

      if (filterPosts && !Object.keys(postLikes).length) {
        filteredPosts.forEach((post) => {
          dispatch(loadLikesThunk(post.id)).then((likes) => {
            setPostLikes((prevPostLikes) => {
              return { ...prevPostLikes, [post.id]: likes };
            });
          });
        });
      }

      return filteredPosts;

    } else {
      return [];
    }
  }

  if (!user) {
    history.push('/login')
    return null;
  }

  if (posts) {

    const feedPosts = filterPosts()

    if (!feedPosts.length) {

      return (<div >
        <h1 className='no-posts-in-your-feed'>There are no posts in your feed, get started by following other users</h1>
        <div className='find-users-button-container'>
          <button className='find-users-button' onClick={() => history.push('/users')}>Find Users</button>
        </div>
        </div>
      )
    } else {
      return (
        <div className='home-page-feed-container'>
         {posts && feedPosts.map((post) => {
             return <div key={post.id} className='home-feed-post-container'>
                 <div className='home-feed-post-owner-info-container'>
                 <NavLink to={`/users/${post.owner.id}/profile`}><img src={post.owner.image} className='home-feed-post-owner-image'></img></NavLink>
                 <NavLink className='owner-info-nav-link-text' to={`/users/${post.owner.id}/profile`}><span className='home-feed-post-owner-username'>{post.owner.username}</span></NavLink>
                 </div>
                 <img src={post.media} className='home-feed-post-image'></img>
                 <div className='home-feed-post-interaction-area'>

                 {/* Like logic */}
                 {isLiked(post)}

                 <span onClick={() => {
                   setCurrentPost(post.id)
                   setModalIsOpen(true)
                   }}
                   className='home-page-feed-likes-span'
                   >Likes</span>
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
}

export default HomeFeed;
