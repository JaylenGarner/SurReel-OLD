
from flask_socketio import SocketIO, emit, join_room, leave_room
import os
from flask_login import current_user
from app.models import Message, db

# configure cors_allowed_origins
if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        "*"
    ]
else:
    origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins)

# Join room
@socketio.on("connection")
def connected(room):
    join_room(room)
    message = f"Connected!!! to room {room}"
    emit("connection", message, room=room)
    print(f"Emitting message: {message}")

# handle chat messages
@socketio.on("chat")
def handle_chat(data):
    messageObj = data.get("message")

    new_message = Message (
        user_id = messageObj['userId'],
        message_server_id = messageObj['roomId'],
        body = messageObj['body']
    )

    db.session.add(new_message)
    db.session.commit()

    room = data.get("room")
    leave_room(room) # leave all previous rooms
    join_room(room)
    emit("chat", new_message.to_dict(), room=room)
