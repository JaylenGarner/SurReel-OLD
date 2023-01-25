from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Post

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


# Get posts that a user has created
@user_routes.route('/<int:id>/posts')
@login_required
def get_my_posts(id):

    res = {}

    user = User.query.get(id)
    posts = user.to_dict_posts()['posts']

    for post in posts:
        res[f'{post["id"]}'] = post

    return res


# Get relevant posts for the feed (Your posts and the posts of those that you follow)
@user_routes.route('/<int:id>/feed')
@login_required
def get_my_feed(id):

    res = {}

    user = User.query.get(id)
    following = user.to_dict_follow()['following']

    for followee in following:
        followed_user = followee['followee']
        followed_user_posts = followed_user['posts']

        for post in followed_user_posts:
            res[f'{post["id"]}'] = post

    return res


@user_routes.route('/<int:id>/followers')
@login_required
def get_my_followers(id):

    res = {}

    user = User.query.get(id)
    followers = user.to_dict_get_followers()['followers']

    for follower in followers:
        following_user = follower['follower']
        res[f'{following_user["id"]}'] = following_user

    return res



@user_routes.route('/<int:id>/following')
@login_required
def get_my_followings(id):

    res = {}

    user = User.query.get(id)
    following = user.to_dict_get_following()['following']

    for followee in following:
        followed_user = followee['followee']
        res[f'{followed_user["id"]}'] = followed_user

    return res
