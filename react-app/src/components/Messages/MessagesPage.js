import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DirectMessagesNav from './DirectMessagesNav';
// import { loadMessageServersThunk } from '../../store/messages';

import './MessagesPage.css';

const MessagesPage = () => {
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

                </div>

            </div>
            </div>
        </div>
    );
}


export default MessagesPage;
