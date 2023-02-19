import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
// import DirectMessagesNav from '../DirectMessagesNav/DirectMessagesNav';
import RoomsNav from '../../RoomsNav/RoomsNav';
import CreateRoomForm from '../CreateRoomForm/CreateRoomForm';
import './CreateRoomPage.css';

const CreateRoomPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user)

  return (
    <div className='message-page-container'>
        <div className='message-page-flex-container'>
        <div className='message-page-content-container'>
            <div className='dm-nav-container'>
                <RoomsNav />
            </div>
            <div className='dm-page-messages-feed-container'>
                <CreateRoomForm />
            </div>
        </div>
        </div>
    </div>
);
}


export default CreateRoomPage;
