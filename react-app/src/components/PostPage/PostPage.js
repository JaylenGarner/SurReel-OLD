import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { loadPostThunk } from '../../store/posts';
import { deletePostThunk } from '../../store/posts';
import Modal from 'react-modal'
import EditPostForm from './EditPostForm';
import LikesModalContent from '../Likes/LikesModalContent';
import PostPageComments from './PostPageComments/PostPageComments';
import { likePostThunk } from '../../store/likes';
import { unlikePostThunk } from '../../store/likes';
import { loadLikesThunk } from '../../store/likes';
import { loadCommentsThunk } from '../../store/comments';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartFilled } from '@fortawesome/free-solid-svg-icons';
import './PostPage.css';

import { likeHelper } from '../../utils/likes/likeHelper';

function PostPage() {
  const dispatch = useDispatch();
  const history = useHistory()
  const user = useSelector((state) => state.session.user)
  const posts = useSelector((state) => state.posts)
  const likes = useSelector((state) => state.likes)
  const comments = useSelector((state) => state.comments)

  const { postId } = useParams()

  const [editCaptionModalIsOpen, setEditCaptionModalIsOpen] = useState(false);
  const [likesModalIsOpen, setLikesModalIsOpen] = useState(false);

  useEffect(() => {
    dispatch(loadPostThunk(postId));
    dispatch(loadLikesThunk(postId))
    dispatch(loadCommentsThunk(postId))
 }, [dispatch, postId]);

  const handleDelete = async (e, postId) => {
    e.preventDefault()
    const deletePost = await dispatch(deletePostThunk(postId))
    const redirectToProfile = await history.push(`/users/${user.id}/profile`);
  }

  const isLiked = (post) => {

    if (user && likes) {
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

    if (!posts || !posts[postId]) {
      return <></>
    } else {

    const post = posts[postId]

    return (
    <div className='post-page-grid'>
      <img className='post-page-image' src={post.media}></img>
      <div className='post-page-content'>
        <div className='post-page-owner-info'>
          <NavLink to={`/users/${post.owner.id}/profile`}>
            <img src={post.owner.image} className='post-page-user-image'></img>
          </NavLink>
          <NavLink to={`/users/${post.owner.id}/profile`} className='post-page-owner-username'>{post.owner.username}</NavLink>
          <span className='post-page-caption'>{post.caption}</span>
          {user.id == post.owner.id && <button onClick={() => setEditCaptionModalIsOpen(true)} className='edit-caption-button'>Edit caption</button>}
          {user.id == post.owner.id &&<button onClick={(e) => handleDelete(e, postId)} className='delete-post-button'>Delete Post</button>}
        </div>

        <div className='post-page-interaction-grid'>

          <div className='post-page-comments-feed-container'>
            <PostPageComments />
          </div>

        <div className='post-page-interaction-area-container'>
              {/* Like logic */}
              {isLiked(post)}
              <span onClick={() => setLikesModalIsOpen(true)} className='post-page-likes-modal-button'>Likes</span>
             </div>
          <div>
        </div>


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
                <div className='edit-post-cancel-button-container'>
                <button onClick={() => setEditCaptionModalIsOpen(false)} className='edit-post-cancel-button'>Cancel</button>
                </div>
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
                <LikesModalContent setModalIsOpen={setLikesModalIsOpen} postId={post.id}/>
             </Modal>
            </div>
          </div>
        </div>
      </div>
  );
  }
}
export default PostPage;
