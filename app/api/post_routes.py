from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy import and_
from app.models import db, User, Post, Like


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

    if post.owner_id != current_user.id:
        return 'You are not the owner of this post'

    db.session.commit()
    return post.to_dict()


# Delete a post
@post_routes.route('/<int:id>/delete', methods=[ 'DELETE' ])
def delete_post(id):

    post = Post.query.get(id)

    if post.owner_id != current_user.id:
        return 'You are not the owner of this post'

    db.session.delete(post)
    db.session.commit()

    return 'The post has been deleted'


@post_routes.route('/<int:id>/likes')
def get_post_likes(id):

    res = {}

    likes = Like.query.filter(Like.post_id == id).all()

    for like in likes:
        el = like.to_dict()
        res[f'{el["id"]}'] = el

    return res

@post_routes.route('/<int:id>/like')
def like_post(id):

    post = Post.query.get(id)

    like = Like (
        user_id = current_user.id,
        post_id = id
    )

    db.session.add(like)
    db.session.commit()

    return post.to_dict()


@post_routes.route('/<int:id>/unlike')
def unlike_post(id):

    like = Like.query.filter(and_(Like.user_id == current_user.id,
    Like.post_id == id)).first()


    db.session.delete(like)
    db.session.commit()

    return 'You have unliked the post'
