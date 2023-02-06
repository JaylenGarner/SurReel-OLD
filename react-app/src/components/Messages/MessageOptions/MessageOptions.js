import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './MessageOptions.css'

const MessageOptions = ({currentBody, setModalIsOpen}) => {
//   const user = useSelector(state => state.session.user);
//   const {postId} = useParams();
  const dispatch = useDispatch();
//   const history = useHistory();
  const [message, setMessage] = useState(currentBody.body);
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

  const updateMessage = (e) => {
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
        <button type='submit' className='message-buttons delete-message-button'>Delete Message</button>
        </div>
      </div>
    </form>
  );
};

export default MessageOptions;
