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
        <h1 className='dm-nav-test'>yo</h1>
    );
}


export default DirectMessagesNav;
