from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, MessageServer

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
