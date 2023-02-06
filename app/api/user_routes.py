from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from sqlalchemy import and_
from app.models import db, User, Post, Follow

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():

    res = {'users': []}
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    for user in users:
        if user.id != current_user.id:
            res['users'].append(user.to_dict())

    return res


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


@user_routes.route('/follow/<int:targetid>')
@login_required
def follow_user(targetid):

    user = User.query.get(current_user.id)
    following = user.to_dict_get_following()['following']

    users = User.query.all()
    user_ids = ([el.to_dict_basic()['id'] for el in users])

    if targetid not in user_ids:
        return "This user doesn't exist"

    if current_user.id == targetid:
            return 'You cannot follow yourself'

    for el in following:
        followee = el['followee']

        if followee['id'] == targetid:
            return 'You already follow this user'


    follow = Follow (
        follower_id = current_user.id,
        followee_id = targetid
    )

    db.session.add(follow)
    db.session.commit()

    return {"msg": "Follow successful"}


@user_routes.route('/unfollow/<int:targetid>', methods = ['DELETE'])
@login_required
def unfollow_user(targetid):

    follower_id = current_user.id
    followee_id = targetid

    if User.query.get(followee_id) == None:
        return "The user doesn't exist"

    follow = Follow.query.filter(and_(Follow.follower_id == follower_id, Follow.followee_id == followee_id)).first()

    if follow:
        db.session.delete(follow)
        db.session.commit()

        return "You have unfollowed the user"

    return "You do not follow this user"
