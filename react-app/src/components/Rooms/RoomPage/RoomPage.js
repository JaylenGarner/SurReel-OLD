import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import RoomsNav from '../RoomsNav/RoomsNav';
import MessageFeed from '../../Messages/MessageFeed/MessageFeed';
import { deleteRoomThunk, loadRoomsThunk } from '../../../store/rooms';
import { createMessageThunk } from '../../../store/messages';
import '../../Messages/MessagingHome/MessagingHome.css'
import './RoomPage.css';

const RoomPage = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const { roomId } = useParams()
  const user = useSelector((state) => state.session.user)

  const [body, setBody] = useState('')

  const updateBody = (e) => {
    setBody(e.target.value);
}

  const handleDelete = async ()  => {
    dispatch(deleteRoomThunk(roomId))
    history.push('/messages')
  }

  const handleSend = async (e) => {
    e.preventDefault()

    if (body.length < 1) {
      return
    } else {
      const send = await dispatch(createMessageThunk(roomId, body))
      setBody('')
    }
  }

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      handleSend(e);
    }
  }

    return (
        <div className='message-page-container'>
            <div className='message-page-flex-container'>
            <div className='message-page-content-container'>
                <div className='dm-nav-container'>
                    <RoomsNav />
                </div>
                <div className='dm-page-messages-feed-container'>
                    <MessageFeed />
                    <div className='message-feed-interaction-container'>
                        <input
                        className='message-body-input'
                        name='body'
                        type='text'
                        required={true}
                        onChange={updateBody}
                        value={body}
                        placeholder="Message..."
                        onKeyDown={handleEnterPress}
                        >
                        </input>
                        <img onClick={(e) => handleSend(e)} className='send-message-submit' src='https://surreel-app-images.s3.amazonaws.com/assets/send_icon.png'></img>
                    <span className='leave-conversation' onClick={() => handleDelete()}>Delete Chat</span>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}


export default RoomPage;
