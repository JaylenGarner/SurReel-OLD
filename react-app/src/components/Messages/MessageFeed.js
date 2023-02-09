import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import Modal from 'react-modal'
import { loadMessageServersThunk, loadOneMessageServerThunk } from '../../store/messages';
import { useHistory } from 'react-router-dom';
import { leaveMessageServerThunk } from '../../store/messages';
import { useDispatch } from 'react-redux';
import MessageOptions from './MessageOptions/MessageOptions'
import './MessagesFeed.css'

import { io } from 'socket.io-client';
let socket;

function MessageFeed() {
  const dispatch = useDispatch()
  const history = useHistory()
  const {messageServerId} = useParams()
  const user = useSelector((state) => state.session.user)
  const messageServer = useSelector((state) => state.messages.currMessageServer)
  const messageServers = useSelector((state) => state.messages.messageServers)


  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [targetMessage, setTargetMessage] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    dispatch(loadOneMessageServerThunk(messageServerId))
    dispatch(loadMessageServersThunk())

    socket = io();

    setMessages([])
    // if (messageServer) {
      socket.on("chat", (chat) => {
        setMessages(messages => [...messages, chat])
    })


    // when component unmounts, disconnect
    return (() => {
      socket.disconnect()
    })

    if (!modalIsOpen) setTargetMessage(false)
  }, [dispatch, messageServerId, isLoaded, setMessages]);

  const handleLeave = async ()  => {
    history.push('/messages')
    const leave = await dispatch(leaveMessageServerThunk(messageServerId))
    const reload = await dispatch(loadMessageServersThunk())
  }

  // if (!messageServer.messages || !messageServer.messages.length) {
  //     return (
  //       <div>
  //        <h1 className='no-messages'>No messages, start a conversation</h1>
  //     </div>)
  // } else {
    if (messages.length === 0 && messageServers[messageServerId].messages.length !== 0)  setMessages(messageServers[messageServerId].messages)

      return (
        <div className='message-feed-container'>
            <br></br>
            {messages.map((message) => {
                return (<div className="message-content-container">
                 {message.user.id === user.id ? <div className='message-sent-by-me-container'>
                 <div className='message-sent-by-me'
                 onClick={() => {
                  setModalIsOpen(true)
                  setTargetMessage(message)
                  }}>
                    <span className='message-body-sent-by-me'>{message.body}</span>
                 </div>

              {message.user_id === user.id && <Modal
              isOpen={modalIsOpen}
              style={{
                content: {
                  width: '400px',
                  height: '150px',
                  top: '18%',
                  left: '42%',
                  backgroundColor: '#262626',
                  color: 'white',
                }
              }}
              >
                <div className='profile-following-modal-header-container'>
                  <span className='profile-following-modal-header-text'>Edit Message</span>
                </div>
                <button onClick={() => setModalIsOpen(false)} className='profile-following-modal-close-button'>X</button>
                <MessageOptions currentBody={targetMessage} setModalIsOpen={setModalIsOpen} serverId={messageServerId}/>
              </Modal>}

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
            {/* <div>{messages.map((message) => {
              return <h1>{message.body}</h1>
            })}</div> */}
        </div>
      );
  }
// }

export default MessageFeed;
