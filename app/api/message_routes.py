from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, MessageServer, MessageServerMember

message_routes = Blueprint('messages', __name__)


# @message_routes.route('/')
# @login_required
# def get_my_message_servers():
