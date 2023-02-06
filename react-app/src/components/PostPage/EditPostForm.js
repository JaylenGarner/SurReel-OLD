import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { editPostThunk } from '../../store/posts';
import { loadPostThunk } from '../../store/posts';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import MessageOptions from '../Messages/MessageOptions/MessageOptions';
import './EditPostForm.css'

const EditPostForm = ({currentCaption, setEditCaptionModalIsOpen}) => {
  const user = useSelector(state => state.session.user);
  const {postId} = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [caption, setCaption] = useState(currentCaption);
  const [errors, setErrors] = useState([]);

  const closeModal = () => {
    setEditCaptionModalIsOpen(false);
  }

  useEffect(() => {

  }, [dispatch, caption])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = await dispatch(editPostThunk(postId, caption))
    const reload = await dispatch(loadPostThunk(postId))
    const close = await closeModal()
  };

  const updateCaption = (e) => {
    setCaption(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className='edit-server-form-container'>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
          ))}
      </div>
        <h1 className='edit-post-form-header'>Edit this post's caption</h1>
      <div>
        <input
          className='edit-form-image-input'
          name='caption'
          type='text'
          placeholder={caption}
          value={caption}
          onChange={updateCaption}
          required
          />
        <div className='edit-form-button-container'>
        <button type='submit' className='edit-form-button'>Change Caption</button>
        </div>
      </div>
    </form>
  );
};

export default EditPostForm;
