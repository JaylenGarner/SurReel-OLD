import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import DirectMessagesNav from '../DirectMessagesNav/DirectMessagesNav';
import MessageFeed from '../MessageFeed';
import { leaveMessageServerThunk } from '../../../store/messages';
import { loadMessageServersThunk } from '../../../store/messages';
import { loadOneMessageServerThunk } from '../../../store/messages';
import { createMessageThunk } from '../../../store/messages';
import './HomeMessagesPage.css';
import './MessageServerPage.css';

import { io } from 'socket.io-client';
let socket;

const MessageServerPage = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const { messageServerId } = useParams()
  const user = useSelector((state) => state.session.user)

  const [body, setBody] = useState('')

  socket = io()


  const updateBody = (e) => {
    setBody(e.target.value);
}

  const handleLeave = async ()  => {
    history.push('/messages')
    const leave = await dispatch(leaveMessageServerThunk(messageServerId))
    const reload = await dispatch(loadMessageServersThunk())
  }

  const handleSend = async (e) => {
    e.preventDefault()

    if (body === '') {
      return
    } else {
      const send = await dispatch(createMessageThunk(messageServerId, body))
      const reload = await dispatch(loadOneMessageServerThunk(messageServerId))
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
                    <DirectMessagesNav />
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
                    <span className='leave-conversation' onClick={() => handleLeave()}>Delete Chat</span>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}


export default MessageServerPage;
