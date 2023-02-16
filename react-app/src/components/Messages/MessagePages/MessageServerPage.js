import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import DirectMessagesNav from '../DirectMessagesNav/DirectMessagesNav';
import MessageFeed from '../MessageFeed';
import { deleteRoomThunk } from '../../../store/rooms';
import { loadRoomsThunk } from '../../../store/rooms';
import { createMessageThunk } from '../../../store/messages';
import { loadMessagesThunk } from '../../../store/messages';
import './HomeMessagesPage.css';
import './MessageServerPage.css';

import { io } from 'socket.io-client';
let socket;

const MessageServerPage = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const user = useSelector((state) => state.session.user)
  const messages = useSelector((state) => state.messages)
  const { roomId } = useParams()
  const [body, setBody] = useState('')
  const rooms = useSelector((state) => state.rooms)

  const [chat, setChat] = useState([]);


  useEffect(() => {

    dispatch(loadRoomsThunk())
    dispatch(loadMessagesThunk(roomId))

    socket = io();

    setChat([])

      socket.on("chat", (message) => {
        setChat(chat => [...chat, message])
    })

    // when component unmounts, disconnect
    return (() => {
      socket.disconnect()
    })
  }, [roomId, dispatch])


const handleSend = async (e) => {
  e.preventDefault()

  if (body.length < 1) {
    return
  } else {

    let msgObj = {
      user: {
        username: user.username,
        image: user.image,
        id: user.id
      },
      body: body
    }

    socket.emit("chat", msgObj);
    setBody('')
    dispatch(createMessageThunk(roomId, body))
  }
}

  const updateBody = (e) => {
    setBody(e.target.value);
}

  const handleLeave = async ()  => {
    history.push('/messages')
    dispatch(deleteRoomThunk(roomId))
  }


  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      handleSend(e);
    }
  }

  if (!rooms || !rooms[roomId]) {
    return <div>ddkcndlkcnldknclkdncmdcmd.c</div>
  } else {

    // if (messages.length === 0 && rooms[roomId].messages.length !== 0)  setMessages(rooms[roomId].messages)
    // if (!messages.length) return <h1>ddjkedncjdnclkdnckldnvljkdbnvkjelmcklsnckjdejfe;wk.,c ekjfje;lc</h1>

    return (
        <div className='message-page-container'>
            <div className='message-page-flex-container'>
            <div className='message-page-content-container'>
                <div className='dm-nav-container'>
                    <DirectMessagesNav socket={socket}/>
                </div>
                <div className='dm-page-messages-feed-container'>
                    <MessageFeed />
                    <div className='message-feed-interaction-container'>
                        <input
                        className='message-body-input'
                        name='body'
                        type='text'
                        required={true}
                        onChange={updateBody}
                        value={body}
                        placeholder="Message..."
                        onKeyDown={handleEnterPress}
                        >
                        </input>
                        <img onClick={(e) => handleSend(e)} className='send-message-submit' src='https://surreel-app-images.s3.amazonaws.com/assets/send_icon.png'></img>
                    <span className='leave-conversation' onClick={() => handleLeave()}>Delete Chat</span>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
  }
}


export default MessageServerPage;
