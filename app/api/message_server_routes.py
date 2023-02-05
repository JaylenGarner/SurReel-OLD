from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy import and_
from app.models import db, User, MessageServer, MessageServerMember, Message

message_servers_routes = Blueprint('message_servers', __name__)


# Get message servers that I am a member or owner of
@message_servers_routes.route('')
@login_required
def get_my_message_servers():

    res = {}

    user = User.query.get(current_user.id)

    message_servers = MessageServerMember.query.filter(MessageServerMember.user_id == current_user.id).all()

    for serv in message_servers:
        message_server_id = serv.to_dict()['message_server_id']
        message_server = MessageServer.query.get(message_server_id)
        res[f'{message_server.id}'] = message_server.to_dict()

    return res


@message_servers_routes.route('/<int:id>')
@login_required
def get_message_server_by_id(id):

    message_server = MessageServer.query.get(id)

    if message_server == None:
        return {'msg': "A message server with that ID does not exist"}

    return message_server.to_dict()




@message_servers_routes.route('/create', methods=['POST'])
@login_required
def create_message_server():

    message_server = MessageServer(
        owner_id = current_user.id
    )

    db.session.add(message_server)
    db.session.commit()
    message_server_id = message_server.to_dict()['id']

    # Add owner as a member
    owner = MessageServerMember(
        user_id = current_user.id,
        message_server_id = message_server_id
    )

    db.session.add(owner)

    # Gathers member ids from the request and adds them to the message server
    members = request.json['members']
    for member_id in members:
        curr_member = MessageServerMember(
            user_id = member_id,
            message_server_id = message_server_id
        )

        db.session.add(curr_member)

    db.session.commit()

    return message_server.to_dict()


# Only the owner can delete the chat, members will be presented with the option to leave the chat
@message_servers_routes.route('<int:id>/delete', methods=['DELETE'])
@login_required
def delete_message_server(id):

    message_server = MessageServer.query.get(id)

    if message_server == None:
        return {'msg': "A message server with that ID does not exist"}

    if message_server.to_dict()['owner_id'] == current_user.id:
        db.session.delete(message_server)
        db.session.commit()

        return {'msg': "The chat has been deleted"}

    return {"msg": "You are not authorized to delete this chat"}


@message_servers_routes.route('<int:id>/leave', methods=['DELETE'])
@login_required
def leave_message_server(id):

    # Need to fix error handling, if you are not a member of a server, the request crashes

    message_server = MessageServer.query.get(id)

    if message_server == None:
        return {'msg': "A message server with that ID does not exist"}

    message_server_member = MessageServerMember.query.filter(and_(MessageServerMember.user_id == current_user.id,
    MessageServerMember.message_server_id == id)).first()

    if message_server_member is not None:
        db.session.delete(message_server_member)
        db.session.commit()

        members = message_server.to_dict()['members']

        if len(members) == 0:
            db.session.delete(message_server)
            db.session.commit()

        return {'msg': "You have left the chat"}

    return {"You are not a member of this chat"}



@message_servers_routes.route('/<int:id>/message', methods=['POST'])
@login_required
def create_a_message(id):

    message_server = MessageServer.query.get(id)

    if message_server == None:
        return {'msg': 'This message server does not exist. Message failed'}

    new_message = Message (
        user_id = current_user.id,
        message_server_id = id,
        body = request.json['body']
        # Will add media later on to send images in chat
    )

    db.session.add(new_message)
    db.session.commit()

    return new_message.to_dict()
