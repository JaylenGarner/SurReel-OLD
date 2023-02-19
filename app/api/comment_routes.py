from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Comment

comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def edit_comment(id):

    comment = Comment.query.get(id)

    if comment == None:
        return {"msg": "A comment could not be found by the requested ID"}

    if comment.user_id != current_user.id:
        return {"msg": "This is not your comment"}

    comment.body = request.json["body"]

    db.session.commit()

    return comment.to_dict()


@comment_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_message(id):

    comment = Comment.query.get(id)

    if comment == None:
        return {"msg": "A message could not be found by the requested ID"}

    if comment.user_id != current_user.id:
        return {"msg": "This is not your message"}

    db.session.delete(comment)
    db.session.commit()

    return {"msg": 'Message has been deleted'}
