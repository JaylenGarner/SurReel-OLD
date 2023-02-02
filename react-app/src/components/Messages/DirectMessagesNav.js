import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadMessageServersThunk } from '../../store/messages';
import './DirectMessagesNav.css';

const DirectMessagesNav = () => {
  const dispatch = useDispatch();
  const messageServs = useSelector((state) => state.messages.messageServers)
  const user = useSelector((state) => state.session.user)

  useEffect(() => {

    if (user) {
      dispatch(loadMessageServersThunk());
    }
  }, [dispatch]);

    return (
      <div className='dm-nav-username-container'>
        <h1 className='dm-nav-username'>{user.username}</h1>
      </div>
    );
}


export default DirectMessagesNav;
