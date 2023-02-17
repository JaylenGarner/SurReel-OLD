import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import Modal from 'react-modal'
import { loadRoomsThunk} from '../../store/rooms';
import { loadMessagesThunk } from '../../store/messages';
import { useHistory } from 'react-router-dom';
import { deleteRoomThunk } from '../../store/rooms';
import { useDispatch } from 'react-redux';
import MessageOptions from './MessageOptions/MessageOptions'
import './MessagesFeed.css'

import { io } from 'socket.io-client';
let socket;

export const deleteMessage = (messageId) => {
  socket.emit("delete_message", messageId);
}

function MessageFeed() {
  const dispatch = useDispatch()
  const history = useHistory()
  const {roomId} = useParams()
  const user = useSelector((state) => state.session.user)
  const messages = useSelector((state) => state.messages)
  const rooms = useSelector((state) => state.rooms)

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [targetMessage, setTargetMessage] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [chat, setChat] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    dispatch(loadRoomsThunk())
    dispatch(loadMessagesThunk(roomId))
    socket = io();

    setChat([])

    if (messages[roomId]) {
      setChat(Object.values(messages[roomId]) || []);
      setIsLoading(false);
    }


      socket.on("chat", (message) => {
        setChat(chat => [...chat, message])
    })

    socket.on("message_deleted", (deletedMessageId) => {
      setChat((chat) =>
        chat.filter((message) => message.id !== deletedMessageId)
      );
    });

    if (!modalIsOpen) setTargetMessage(false)

    // when component unmounts, disconnect
    return (() => {
      socket.disconnect()
    })

  }, [dispatch, roomId, isLoaded, setChat]);

  useEffect(() => {
    if ((chat.length === 0) && messages) {
      if (messages.length) {
        setChat(Object.values(messages[roomId]) || []);
        setIsLoading(false);
      } else {
        setIsLoading(false)
      }
    }
  }, [messages, roomId, setChat]);

  const handleLeave = async ()  => {
    history.push('/messages')
    deleteRoomThunk(roomId)
  }

    if (isLoading) {
      return <div>Loading...</div>
    } else {

      // if (chat.length === 0 && messages.length === 0) setChat(Object.values(messages))
      return (
        <div className='message-feed-container'>
            <br></br>
            {chat.map((message) => {
                return (
                <div className="message-content-container">
                 {message.user && message.user.id && message.user.id === user.id ? <div className='message-sent-by-me-container'>
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
                <MessageOptions currentBody={targetMessage} setModalIsOpen={setModalIsOpen} roomId={roomId} deleteMessageFunc={deleteMessage}/>
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
        </div>
      );
  }
}


export default MessageFeed;
