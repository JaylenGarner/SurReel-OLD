import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RoomsNav from '../../Rooms/RoomsNav/RoomsNav';
import MessageFeed from '../MessageFeed/MessageFeed';
import './MessagingHome.css';

const MessagingHome = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user)

    return (
        <div className='message-page-container'>
            <div className='message-page-flex-container'>
            <div className='message-page-content-container'>
                <div className='dm-nav-container'>
                    <RoomsNav />
                </div>
                <div className='dm-home-page-messages-feed-container fade-in'>
                    <h1 className='messages-home-your-messages'>Your messages</h1>
                    <span className='messages-home-sub-heading'>Send private messages to a friend or a group</span>
                </div>
            </div>
            </div>
        </div>
    );
}


export default MessagingHome;
