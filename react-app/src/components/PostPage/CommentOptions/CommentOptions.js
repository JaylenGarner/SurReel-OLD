import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { deleteCommentThunk, editCommentThunk } from '../../../store/comments';
import './CommentOptions.css'


const CommentOptions = ({currentComment, closeModal}) => {
  const {postId} = useParams();
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [comment, setComment] = useState(currentComment.body);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = await dispatch(editCommentThunk(currentComment.id, comment))
    const close = await closeModal()
  };

  const updateComment = (e) => {
    setComment(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className='edit-server-form-container'>
        <h1 className='edit-comment-form-header'>Edit your comment</h1>
      <div>
        <input
          className='edit-form-image-input'
          name='comment'
          type='text'
          placeholder={comment}
          value={comment}
          onChange={updateComment}
          required
          />
        <div className='edit-form-button-container'>
        <button type='submit' className='edit-post-form-change-button'>Change Comment</button>
        </div>
      </div>
    </form>

  );
};

export default CommentOptions;
