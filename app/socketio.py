
from flask_socketio import SocketIO, emit, join_room, leave_room
import os
from flask_login import current_user

# configure cors_allowed_origins
if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        'https://surreel.onrender.com/',
        'http://surreel.onrender.com/'
    ]
else:
    origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins)

# Join room
@socketio.on("connection")
def connected(room):
    print(room, 'ROOM!!!!!!!!!!!!!!')
    join_room(room)
    message = f"Connected!!! to room {room}"
    emit("connection", message, room=room)
    print(f"Emitting message: {message}")

# handle chat messages
@socketio.on("chat")
def handle_chat(data):
    room = data.get("room")
    user = current_user.username
    leave_room(room) # leave all previous rooms
    join_room(room)
    message = {"user": user, "msg": data.get("msg"), "room": room}
    emit("chat", message, room=room)
