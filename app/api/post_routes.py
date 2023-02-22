from flask import Blueprint, jsonify, request, render_template, redirect, url_for, flash
from flask_login import login_required, current_user
from sqlalchemy import and_
from app.models import db, User, Post, Like, Comment
from ..aws import (upload_file_to_s3, allowed_file, get_unique_filename)


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


# Get all likes for a post
@post_routes.route('/<int:id>/likes')
def get_post_likes(id):

    res = {}

    likes = Like.query.filter(Like.post_id == id).all()

    for like in likes:
        el = like.to_dict()
        res[f'{el["id"]}'] = el

    return res

# Like a post
@post_routes.route('/<int:id>/like')
def like_post(id):

    post = Post.query.get(id)

    likes = post.to_dict()['likes']

    for like in likes:
        user = like['user']
        if user['id'] == current_user.id:
            return post.to_dict()

    new_like = Like (
        user_id = current_user.id,
        post_id = id
    )

    db.session.add(new_like)
    db.session.commit()

    return new_like.to_dict()


# Unlike a post
@post_routes.route('/<int:id>/unlike', methods = ['DELETE'])
def unlike_post(id):

    like = Like.query.filter(and_(Like.user_id == current_user.id,
    Like.post_id == id)).first()

    db.session.delete(like)
    db.session.commit()

    return like.to_dict()


# Get all of a posts comments
@post_routes.route('/<int:id>/comments')
def get_post_comments(id):

    res = {}

    comments = Comment.query.filter(Comment.post_id == id).all()

    for comment in comments:
        el = comment.to_dict()
        res[f'{el["id"]}'] = el

    return res

# Comment on a post
@post_routes.route('/<int:id>/comment', methods=[ 'POST' ])
def comment_on_post(id):

    post = Post.query.get(id)

    comment = Comment (
        user_id = current_user.id,
        post_id = id,
        body = request.json["body"]
    )

    db.session.add(comment)
    db.session.commit()

    return comment.to_dict()


# Create a post
@post_routes.route("/create", methods=["POST"])
@login_required
def upload_image():

    image = request.files["image"]

    print (image, 'IMAGE ON BACKEND SUBMISSION!!!')

    if "image" not in request.files:
        print("IMAGE NOT IN REQUESTED FILES")
        return {"errors": "image required"}, 400

    if not allowed_file(image.filename):
        print("IMAGE NOT A PERMITTED FILE")
        return {"errors": "file type not permitted"}, 400

    print(image, "MADE IT PAST CONDITIONALS")

    image.filename = get_unique_filename(image.filename)

    print(image.filename, "MADE IT TO BE ASSIGNED A FILENAME")

    # ERROR HAPPENS HERE
    upload = upload_file_to_s3(image)

    print(upload, "MADE IT PAST THE UPLOAD")

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        print(" URL NOT IN UPLOAD")
        return upload, 400

    url = upload["url"]

    print(url, "URL CREATED")
    # flask_login allows us to get the current user from the request
    post = Post(
        owner_id = current_user.id,
        media = url,
        caption = request.form['caption']
    )

    print(post.to_dict(), "POST CREATED")
    print(url, "HERE IS THE URL")
    db.session.add(post)
    db.session.commit()
    return {"url": url}
