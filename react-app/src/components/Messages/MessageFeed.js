import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { loadOneMessageServerThunk } from '../../store/messages';
import { useDispatch } from 'react-redux';
import './MessagesFeed.css'

function MessageFeed() {
  const user = useSelector((state) => state.session.user)
  const {messageServerId} = useParams()
  const dispatch = useDispatch()
  const messageServer = useSelector((state) => state.messages.currMessageServer)

  useEffect(() => {
    dispatch(loadOneMessageServerThunk(messageServerId))
  }, [dispatch, messageServerId]);

  if (!messageServer) {
    return <></>
  } else if (!messageServer.messages.length) {
    return <h1>No messages have been exchanged. Get this conversation started</h1>
  } else {
      return (
        <div className='message-feed-container'>
            {messageServer.messages.map((message) => {
                return (<div className="message-content-container">
                 {message.user_id === user.id ? <div className='message-sent-by-me-container'>
                 <div className='message-sent-by-me'>
                    <span className='message-body-sent-by-me'>{message.body}</span>
                 </div>
                 </div>
                :
                <div className='message-and-image-container'>
                    <div className='profile-image-contaner'>
                        {/* <NavLink to={`/users/${message.user_id}/profile}`}> */}
                        <img src={message.user.image} className='message-user-image'></img>
                        {/* </NavLink> */}
                    </div>
                <div className='message-sent-by-other'>
                  <span className='message-body-sent-by-other'>{message.body}</span>
                </div>
                </div>}
              </div>)
            })}
        </div>
      );
  }
}

export default MessageFeed;
