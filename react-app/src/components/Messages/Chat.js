// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { io } from 'socket.io-client';
// import { loadOneMessageServerThunk } from "../../store/messages";
// import MessageServerPage from "./MessagePages/MessageServerPage";
// import DirectMessagesNav from "./DirectMessagesNav/DirectMessagesNav";
// let socket;

// const Chat = () => {
//     const [chatInput, setChatInput] = useState("");
//     const dispatch = useDispatch()
//     const { messageServerId } = useParams()
//     const user = useSelector(state => state.session.user)
//     const messageServer = useSelector((state) => state.messages.currMessageServer)
//     const [messages, setMessages] = useState([]);
//     socket = io();

//     const connectionChecker = () => {


//         // if (!socket.connected) console.log('connecting...')
//         // if (socket.connected) return console.log('connected')

//         console.log(socket.connected)

//         return connectionChecker()
//     }


//     useEffect(() => {
//         socket = io();

//         // dispatch(loadOneMessageServerThunk(messageServerId))


//         socket.on("chat", (chat) => {
//             setMessages(messages => [...messages, chat])

//         })

//         // connectionChecker()
//         // if (!socket.connected) console.log('connecting...')


//         // console.log(socket.connected)


//         // when component unmounts, disconnect
//         return (() => {
//             socket.disconnect()
//         })
//     }, [messageServerId, socket])


//     // const reconnect = () => {

//     //     // dispatch(loadOneMessageServerThunk(messageServerId))
//     //     // socket.disconnect()
//     //     socket = io();

//     //     socket.on("chat", (chat) => {
//     //         setMessages(messages => [...messages, chat])

//     //         while (!socket.connected) {
//     //             console.log('connecting')
//     //         }

//     //         console.log('connected')
//     //     })

//     //     // when component unmounts, disconnect
//     //     return (() => {
//     //         socket.disconnect()
//     //     })
//     // }

//     // const disconnect = () => {
//     //     socket = io();

//     //     return (() => {
//     //         socket.disconnect()

//     //         while (socket.connected === true) {
//     //             console.log('disconnecting')
//     //             console.log('disconnected')
//     //         }
//     //     })
//     // }


//     // useEffect(()  => {
//     //     setMessages([])
//     //     disconnect()
//     //     reconnect()
//     // }, [dispatch, messageServerId])


//     const updateChatInput = (e) => {
//         setChatInput(e.target.value)
//     };

//     const sendChat = (e, msg) => {
//         e.preventDefault()

//         console.log(user.username)
//         socket.emit("chat", msg);
//         setChatInput("")
//     }

//     const messageSetter = () => {
//         if (!messages.length && messageServer.messages) {
//             setMessages(messageServer.messages)
//         }
//     }

//     if (!messageServer) {
//         return <></>
//       } else if (!messageServer.messages || !messageServer.messages.length) {
//           return (
//             <div>
//              <h1 className='no-messages'>No messages, start a conversation</h1>
//              <DirectMessagesNav />
//              <MessageServerPage sendChat={sendChat}/>
//           </div>)
//       } else {
//         messageSetter()
//     return (user && (
//         <div>
//             <DirectMessagesNav />
//             <div>
//                 {messages.map((message, ind) => (
//                     <div key={ind}>
//                         {`${message.user.username}: ${message.body}`}
//                     </div>
//                 ))}
//             </div>
//             <form onSubmit={sendChat}>
//                 <input
//                     value={chatInput}
//                     onChange={updateChatInput}
//                 />
//                 <button type="submit">Send</button>
//             </form>
//             <MessageServerPage sendChat={sendChat}/>
//         </div>
//     )
//     )
//     }
// };


// export default Chat;
