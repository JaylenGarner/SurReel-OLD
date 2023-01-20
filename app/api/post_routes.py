from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Post

post_routes = Blueprint('posts', __name__)


@post_routes.route('/')
@login_required
def get_my_posts():

    res = {}

    user = User.query.get(current_user.id)
    posts = Post.query.all()

    print(posts)

    for post in posts:
        if post.owner_id == user.id:
            res[f'{post.id}'] = post.to_dict()

    return res
