from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, MessageServer, MessageServerMember, Message

message_routes = Blueprint('messages', __name__)


@message_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def edit_message(id):

    message = Message.query.get(id)

    if message.user_id != current_user.id:
        return {"msg": "This is not your message"}

    message.body = request.json["body"]
    db.session.commit()

    return message.to_dict()
