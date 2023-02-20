import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { io } from 'socket.io-client';
let socket;

const Chat = () => {
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);
    const user = useSelector(state => state.session.user)
    const {roomId} = useParams()

    useEffect(() => {
        // create websocket
        socket = io();

        // join the current room
        socket.emit("connection", roomId);

        // handle chat messages
        socket.on("chat", (chat) => {
            // check if the message is coming from the current room
            if (chat.room === roomId) {
                setMessages(messages => [...messages, chat]);
            }
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
        socket.emit("chat", { user: user.username, msg: chatInput, room: roomId });
        setChatInput("")
    }

    return (user && (
        <div>
            <div>
                {messages.map((message, ind) => (
                    <div key={ind}>{`${message.user}: ${message.msg}`}</div>
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

export default Chat
