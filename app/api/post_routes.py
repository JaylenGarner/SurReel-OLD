from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Post

post_routes = Blueprint('posts', __name__)


@post_routes.route('/<int:id>')
@login_required
def get_post(id):

    post = Post.query.get(id)

    return post.to_dict()
