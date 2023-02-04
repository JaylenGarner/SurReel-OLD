import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DirectMessagesNav from './DirectMessagesNav';
import MessageFeed from './MessageFeed';
import './HomeMessagesPage.css';

const HomeMessagesPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user)

    return (
        <div className='message-page-container'>
            <div className='message-page-flex-container'>
            <div className='message-page-content-container'>
                <div className='dm-nav-container'>
                    <DirectMessagesNav />
                </div>
                <div className='dm-page-messages-feed-container'>
                    <h1>Your messages</h1>
                    <span>Send private messages to a friend of a group</span>
                </div>
            </div>
            </div>
        </div>
    );
}


export default HomeMessagesPage;
