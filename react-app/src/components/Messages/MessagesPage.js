import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { loadMessageServersThunk } from '../../store/messages';
import './MessagesPage.css';

const MessagesPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user)



    return (
        <div className='message-page-container'>
            <span className='test'>hola</span>
        </div>
    );
}


export default MessagesPage;
