from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, MessageServer, MessageServerMember

message_servers_routes = Blueprint('message_servers', __name__)


@message_servers_routes.route('/')
@login_required
def get_my_message_servers():

    res = {}

    user = User.query.get(current_user.id)

    message_servers = MessageServer.query.all()

    for serv in message_servers:
        # if post.owner_id == user.id:
            res[f'{serv.id}'] = serv.to_dict()

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
