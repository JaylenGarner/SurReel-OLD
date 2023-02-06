import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteMessageThunk } from '../../../store/messages';
import { loadOneMessageServerThunk } from '../../../store/messages';
import { useParams } from 'react-router-dom';
import './MessageOptions.css'

const MessageOptions = ({currentBody, setModalIsOpen, serverId}) => {
//   const user = useSelector(state => state.session.user);
//   const {postId} = useParams();
  const dispatch = useDispatch();
//   const history = useHistory();
  const [message, setMessage] = useState(currentBody.body);
  const [messageId, setMessageId] = useState(currentBody.id)
//   const [errors, setErrors] = useState([]);

  const closeModal = () => {
    setModalIsOpen(false);
  }

  useEffect(() => {

  }, [dispatch, message])

  const handleSubmit = async (e) => {
    e.preventDefault()
    // const data = await dispatch(editPostThunk(postId, caption))
    // const reload = await dispatch(loadPostThunk(postId))
    const close = await closeModal()
  };

  const handleDelete = async (e) => {
    e.preventDefault()
    const deleteMessage = await dispatch(deleteMessageThunk(currentBody.id))
    const reload = await dispatch(loadOneMessageServerThunk(serverId))
    closeModal()
  }

  useEffect(() => {

  }, [dispatch, message])

  const updateMessage = (e, messageId) => {
    setMessage(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className='edit-message-form-container'>
      <div>
        {/* {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
          ))} */}
      </div>
      <div>
        <input
          className='edit-form-image-input'
          name='message'
          type='text'
          placeholder={message}
          value={message}
          onChange={updateMessage}
          required
          />
        <div className='message-buttons-container'>
        <button type='submit' className='message-buttons edit-message-button'>Change Message</button>
        <button type='submit' className='message-buttons delete-message-button' onClick={(e) => handleDelete(e)}>Delete Message</button>
        </div>
      </div>
    </form>
  );
};

export default MessageOptions;
