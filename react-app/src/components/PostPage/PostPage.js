import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { loadPostThunk } from '../../store/posts';
import { deletePostThunk } from '../../store/posts';
import Modal from 'react-modal'
import EditPostForm from './EditPostForm';
import LikesModalContent from '../Likes/LikesModalContent';
import { likePostThunk } from '../../store/likes';
import { unlikePostThunk } from '../../store/likes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartO } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartFilled } from '@fortawesome/free-solid-svg-icons';
import './PostPage.css';

function PostPage() {
  const dispatch = useDispatch();
  const history = useHistory()
  const user = useSelector((state) => state.session.user)
  const post = useSelector((state) => state.posts.post)
  const { postId } = useParams()

  const [editCaptionModalIsOpen, setEditCaptionModalIsOpen] = useState(false);
  const [likesModalIsOpen, setLikesModalIsOpen] = useState(false);


  const handleDelete = (postId) => {
    dispatch(deletePostThunk(postId))
    history.push("/");
  }

  useEffect(() => {
     dispatch(loadPostThunk(postId));
  }, [dispatch]);

  if (!post) {
    return null;
  }

  const isLiked = (post) => {

    let likes = []
    if (post.likes) likes = post.likes

    for (let i = 0; i < likes.length; i++) {
      let like = likes[i]

      // Liked
      if (like.user.id == user.id) {
        console.log('LIKED')
        return (

          // <span>Liked</span>
        <button className="like-button" onClick={(e) => handleUnlike(e, post.id)}>
        <FontAwesomeIcon icon={faHeartFilled} />
        </button>)
      }
    }

    // Not liked
    console.log('NOT LIKED')
      return (
        <button className="like-button-empty" onClick={(e) => handleLike(e, post.id)}>
        <FontAwesomeIcon icon={faHeartFilled} />
        </button>
      )
    }

    const handleLike = async (e, postId) => {
      e.preventDefault()
      const data = await dispatch(likePostThunk(postId))
      const reload = await dispatch(loadPostThunk(postId))
    };

    const handleUnlike = async (e, postId) => {
      e.preventDefault()
      const data = await dispatch(unlikePostThunk(postId))
      const reload = await dispatch(loadPostThunk(postId))
    };

  return (
    <div className='post-page-grid'>
      <img className='post-page-image' src={post.media}></img>
      <div className='post-page-content'>
        <div className='post-page-owner-info'>
          <NavLink to={`/users/${post.owner.id}/profile`}>
            <img src={post.owner.image} className='post-page-user-image'></img>
          </NavLink>
          <NavLink to={`/users/${post.owner.id}/profile`} className='post-page-owner-username'>{post.owner.username}</NavLink>
          {user.id == post.owner.id && <button onClick={() => setEditCaptionModalIsOpen(true)} className='edit-caption-button'>Edit caption</button>}
          {user.id == post.owner.id &&<button onClick={() => handleDelete(postId)} className='delete-post-button'>Delete Post</button>}
        </div>
        <div className='post-page-caption-area'>
          <img src={post.owner.image} className='post-page-user-image'></img>
          <NavLink to={`/users/${post.owner.id}/profile`} className='post-page-owner-username'>{post.owner.username}</NavLink>
          <span className='post-page-caption'>{post.caption}</span>
          <div className='post-page-interaction-area-container'>
              {/* Like logic */}
              {isLiked(post)}
              <span onClick={() => setLikesModalIsOpen(true)} className='post-page-likes-modal-button'>Likes</span>
             </div>
          <div>

            <div className='edit-post-caption-modal'>
              <Modal
              isOpen={editCaptionModalIsOpen}
              style={{
                content: {
                  width: '400px',
                  height: '200px',
                  top: '25%',
                  left: '40%',
                  marginRight: '-50%',
                  backgroundColor: '#262626',
                  color: 'white',
                }
              }}
              >
                <EditPostForm currentCaption={post.caption} setEditCaptionModalIsOpen={setEditCaptionModalIsOpen}/>
                <button onClick={() => setEditCaptionModalIsOpen(false)}>Cancel</button>
             </Modal>

             <Modal
              isOpen={likesModalIsOpen}
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
                <button onClick={() => setLikesModalIsOpen(false)} className='profile-following-modal-close-button'>X</button>
                <LikesModalContent setModalIsOpen={setLikesModalIsOpen} postId={post.id} postPage={true}/>
             </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PostPage;
