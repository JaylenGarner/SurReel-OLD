import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadMessagesThunk } from "../../store/messages";
import { useParams } from "react-router-dom";
import { io } from 'socket.io-client';
let socket;

const Chat = () => {
    const [chatInput, setChatInput] = useState("");
    const dispatch = useDispatch()
    const feed = useSelector((state) => state.messages)
    const [messages, setMessages] = useState([]);
    const user = useSelector(state => state.session.user)
    const {roomId} = useParams()

    useEffect(() => {
        dispatch(loadMessagesThunk(roomId))

        // create websocket
        socket = io();

        // setMessages([])

        // join the current room
        socket.emit("connection", roomId);

        // handle chat messages
        socket.on("chat", (chat) => {
            // check if the message is coming from the current room
            setMessages(messages => [...messages, chat]);
        });

        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [roomId]);

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };

    const sendChat = (e) => {
        e.preventDefault()
        const messageObj = { message: {userId: user.id, roomId: roomId, body: chatInput}, room: roomId}
        socket.emit("chat", messageObj);
        setChatInput("")
    }

    if (!feed) {
        return <></>
    } else {

    if (Object.values(feed).length && !messages.length) setMessages(Object.values(feed))

    return (user && (
        <div>
            <div>
                {messages.map((message, ind) => (
                    <div key={ind}>{`${message.user.username}: ${message.body}`}</div>
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
                }
};

export default Chat
