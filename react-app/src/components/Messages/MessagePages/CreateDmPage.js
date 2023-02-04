import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import DirectMessagesNav from '../DirectMessagesNav/DirectMessagesNav';
import CreateMessageServer from '../CreateMessageServer/CreateMessageServer';
import './CreateDmPage.css';

const CreateDmPage = () => {
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
                <CreateMessageServer />
            </div>
        </div>
        </div>
    </div>
);
}


export default CreateDmPage;
