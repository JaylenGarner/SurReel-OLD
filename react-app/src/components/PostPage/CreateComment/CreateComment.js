import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createCommentThunk } from '../../../store/comments';
import './CreateComment.css'

const CreateComment = ({id}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const { postId } = useParams()
  const [comment, setComment] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createCommentThunk((postId || id), comment))
    setComment('')
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className='create-comment-form'>
            <div className="create-comment-container">
              <input
                className='create-comment-input'
                name="comment"
                type="text"
                onChange={handleCommentChange}
                value={comment}
                placeholder="Leave a comment..."
                required='true'
              />
            </div>
            <div className='post-submission-area'>
              {comment.length ? <button type="submit" className="comment-button">
              Post
            </button> : <></>}
        </div>
    </form>
  );
};

export default CreateComment;
