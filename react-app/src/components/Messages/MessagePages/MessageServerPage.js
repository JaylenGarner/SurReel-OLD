import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import DirectMessagesNav from '../DirectMessagesNav/DirectMessagesNav';
import MessageFeed from '../MessageFeed';
import { leaveMessageServerThunk } from '../../../store/messages';
import { loadMessageServersThunk } from '../../../store/messages';
import { loadOneMessageServerThunk } from '../../../store/messages';
import { createMessageThunk } from '../../../store/messages';
import './HomeMessagesPage.css';
import './MessageServerPage.css';

import { io } from 'socket.io-client';
let socket;


const MessageServerPage = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const { messageServerId } = useParams()
  const user = useSelector((state) => state.session.user)
  const [body, setBody] = useState('')
  const messageServer = useSelector((state) => state.messages.currMessageServer)
  const messageServers = useSelector((state) => state.messages.messageServers)

  const [messages, setMessages] = useState([]);


  useEffect(() => {
    // open socket connection
    // create websocket
    dispatch(loadOneMessageServerThunk(messageServerId))
    dispatch(loadMessageServersThunk())

    socket = io();

    setMessages([])
    // if (messageServer) {
      socket.on("chat", (chat) => {
        setMessages(messages => [...messages, chat])
    })


    // console.log(messageServerId)

    // when component unmounts, disconnect
    return (() => {
      socket.disconnect()
    })
  }, [messageServerId])


const handleSend = async (e) => {
  e.preventDefault()

  if (body.length < 1) {
    return
  } else {

    let msgObj = {
      user: {
        username: user.username,
        image: user.image
      },
      body: body
    }

    socket.emit("chat", msgObj);
    setBody('')
    dispatch(createMessageThunk(messageServerId, body))
    const reload = await dispatch(loadOneMessageServerThunk(messageServerId))
  }
}

  const updateBody = (e) => {
    setBody(e.target.value);
}

  const handleLeave = async ()  => {
    history.push('/messages')
    const leave = await dispatch(leaveMessageServerThunk(messageServerId))
    const reload = await dispatch(loadMessageServersThunk())
  }


  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      handleSend(e);
    }
  }


  if (!messageServer) {
    return <div>
      <DirectMessagesNav />
      {/* <MessageFeed /> */}
      <h1>YO</h1>
      </div>

  // } else if (!messageServer.messages || !messageServer.messages.length) {
  //     return (
  //       <div>
  //       <MessageFeed />
  //     </div>)
  }

  // if (!messages.length) {
  //   return (
  //     <div>
  //       <DirectMessagesNav />
  //       <MessageFeed />
  //       <h1 style={{'text-align': 'center'}}>YO</h1>
  //     </div>
  //   )
  // }



  else {

    if (messages.length === 0 && messageServers[messageServerId].messages.length !== 0)  setMessages(messageServers[messageServerId].messages)

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
                    <div>{messages.map((message) => {
              return <h1>{message.body}</h1>
            })}</div>
                </div>
            </div>
            </div>
        </div>
    );
          }
}


export default MessageServerPage;
