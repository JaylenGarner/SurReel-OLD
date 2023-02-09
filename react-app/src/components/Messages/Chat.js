import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { io } from 'socket.io-client';
import { loadOneMessageServerThunk } from "../../store/messages";
let socket;

const Chat = () => {
    const [chatInput, setChatInput] = useState("");
    const dispatch = useDispatch()
    const { messageServerId } = useParams()
    const user = useSelector(state => state.session.user)
    const messageServer = useSelector((state) => state.messages.currMessageServer)
    const [messages, setMessages] = useState([]);

    if (messageServer && !messages.length) setMessages(messageServer.messages)

    useEffect(() => {

        dispatch(loadOneMessageServerThunk(messageServerId))

        // open socket connection
        // create websocket
        socket = io();

        console.log(messages)

        socket.on("chat", (chat) => {
            setMessages(messages => [...messages, chat])
        })
        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [messages])


    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };

    const sendChat = (e) => {
        e.preventDefault()

        console.log(user.username)
        socket.emit("chat", {
            user: {
              username: user.username,
              image: user.image
            },
            body: chatInput });
        setChatInput("")
    }

    return (user && (
        <div>
            <div>
                {messages.map((message, ind) => (
                    <div key={ind}>
                        {`${message.user.username}: ${message.body}`}
                    </div>
                ))}
            </div>
            <form onSubmit={sendChat}>
                <input
                    value={chatInput}
                    onChange={updateChatInput}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    )
    )
};


export default Chat;
