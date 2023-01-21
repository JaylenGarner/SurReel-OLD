from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Post

post_routes = Blueprint('posts', __name__)

# Get post by id
@post_routes.route('/<int:id>')
@login_required
def get_post(id):

    post = Post.query.get(id)
    return post.to_dict()

# Edit a post
@post_routes.route('/<int:id>/edit', methods=[ 'PUT' ])
@login_required
def edit_post(id):

    post = Post.query.get(id)
    post.caption = request.json["caption"]

    db.session.commit()
    return post.to_dict()
