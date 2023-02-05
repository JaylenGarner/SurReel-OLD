import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import DirectMessagesNav from '../DirectMessagesNav/DirectMessagesNav';
import MessageFeed from '../MessageFeed';
import { leaveMessageServerThunk } from '../../../store/messages';
import { loadMessageServersThunk } from '../../../store/messages';
import './HomeMessagesPage.css';
import './MessageServerPage.css';

const MessageServerPage = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const { messageServerId } = useParams()
  const user = useSelector((state) => state.session.user)

  const handleLeave = async ()  => {
    history.push('/messages')
    const leave = await dispatch(leaveMessageServerThunk(messageServerId))
    const reload = await dispatch(loadMessageServersThunk())
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
                        {/* <input
                        type='text'

                        >
                        </input> */}
                    <span className='leave-conversation' onClick={() => handleLeave()}>Delete Chat</span>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}


export default MessageServerPage;
