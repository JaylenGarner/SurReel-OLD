import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { loadMessageServersThunk, loadOneMessageServerThunk } from '../../store/messages';
import { useHistory } from 'react-router-dom';
import { leaveMessageServerThunk } from '../../store/messages';
import { useDispatch } from 'react-redux';
import './MessagesFeed.css'

function MessageFeed() {
  const user = useSelector((state) => state.session.user)
  const {messageServerId} = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  const messageServer = useSelector((state) => state.messages.currMessageServer)

  if (!messageServer) {
    history.push('/messages')
  }

  useEffect(() => {
    dispatch(loadOneMessageServerThunk(messageServerId))

    if (!messageServer) {
      history.push('/messages')
    }

  }, [dispatch, messageServerId, dispatch]);

  const handleLeave = async ()  => {
    history.push('/messages')
    const leave = await dispatch(leaveMessageServerThunk(messageServerId))
    const reload = await dispatch(loadMessageServersThunk())
  }

  if (!messageServer) {
    return <></>
  } else if (!messageServer.messages || !messageServer.messages.length) {
      return (
        <div>
         <h1 className='no-messages'>No messages, start a conversation</h1>
      </div>)
  } else {
      return (
        <div className='message-feed-container'>
            <br></br>
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
                        <NavLink to={`/users/${message.user_id}/profile`}>
                        <img src={message.user.image} className='message-user-image'></img>
                        </NavLink>
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
