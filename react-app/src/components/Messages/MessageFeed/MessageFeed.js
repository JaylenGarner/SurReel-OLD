import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadMessagesThunk } from '../../../store/messages';
import './MessageFeed.css'

function MessageFeed({messages}) {
  const { roomId } = useParams()
  const user = useSelector((state) => state.session.user)

  if (!messages) {
    return (
      <div>
       <h1 className='no-messages'>No messages, start a conversation</h1>
      </div>
    )
  } else {

      return (
        <div className='message-feed-container fade-in'>
            <br></br>
            {Object.values(messages).map((message) => {

              if (message.message_server_id == roomId) {
                return (<div className="message-content-container fade-in">
                 {message.user_id === user.id ? <div className='message-sent-by-me-container'>
                 <div className='message-sent-by-me fade-in'>
                    <span className='message-body-sent-by-me'>{message.body}</span>
                 </div>
                 </div>
                :
                <div className='message-and-image-container fade-in'>
                    <div className='profile-image-contaner'>
                        <NavLink to={`/users/${message.user_id}/profile`}>
                        <img src={message.user.image} className='message-user-image'></img>
                        </NavLink>
                    </div>
                <div className='message-sent-by-other fade-in'>
                  <span className='message-body-sent-by-other'>{message.body}</span>
                </div>
                </div>}
              </div>)
              }
            })}
        </div>
      );
  }
}

export default MessageFeed;
