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
import { loadFollowingThunk } from '../../store/follows';

function HomeFeed() {
  const dispatch = useDispatch();
  const history = useHistory()

  const user = useSelector((state) => state.session.user)
  const posts = useSelector((state) => state.posts)
  const likes = useSelector((state) => state.likes)
  const following = useSelector((state) => state.follows.following)
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState()
  const [isLiking, setIsLiking] = useState(false);

  const isLiked = (post) => {

    let likes = []
    if (post.likes) likes = post.likes

    for (let i = 0; i < likes.length; i++) {
      let like = likes[i]

      // Liked
      if (like.user.id == user.id) {
        return (
        <button className="like-button" onClick={(e) => handleUnlike(e, post.id)}>
        <FontAwesomeIcon icon={faHeartFilled} />
        </button>)
      }
    }

      // Not liked
      return (
        <button className="like-button-empty" onClick={(e) => handleLike(e, post)}>
        <FontAwesomeIcon icon={faHeartFilled} />
        </button>
      )
    }

    const handleLike = async (e, post) => {
      e.preventDefault()
      if (isLiking) return;
      setIsLiking(true);

     let liked;

      if (likes) {
        Object.values(likes).forEach((like) => {
          if (like.post_id == post.id && like.user.id == user.id) liked = true
        })
      }

      if (likes && liked) {
        return
      } else {
        const data = await dispatch(likePostThunk(post.id))
        const reload = await dispatch(loadFeedPostsThunk(user.id))
        setIsLiking(false);
      }
    };

    const handleUnlike = async (e, postId) => {
      e.preventDefault()

      dispatch(loadLikesThunk(postId))

      if (likes) {

        const like = Object.values(likes).filter((like) => {
          return (like.post_id == postId && like.user.id == user.id)
        })


        const data = await dispatch(unlikePostThunk(postId, like[0].id))
      }

    };

  useEffect(() => {

    if (user) {
      dispatch(loadFeedPostsThunk(user.id));
      dispatch(loadFollowingThunk(user.id))
    }

  }, [dispatch]);

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
