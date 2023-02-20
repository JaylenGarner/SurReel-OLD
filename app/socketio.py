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
@socketio.on("connect")
def connected(room):
    join_room(room)
    message = f"Connected to room {room}"
    emit("connect", message, room=room)
    print(f"Emitting message: {message}")

# handle chat messages
@socketio.on("chat")
def handle_chat(data):
    room = data.get("room")
    join_room(room)
    emit("chat", data, room=room)
    # leave_room(room)
