from .db import db, environment, SCHEMA, add_prefix_for_prod


class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')), nullable=False)
    body = db.Column(db.String(255), nullable=True)

    # User Relationship
    user = db.relationship("User", back_populates='comments')

    # Post Relationship
    post = db.relationship("Post", back_populates='comments')

    def to_dict(self):
        return {
            'id': self.id,
            'post_id': self.post_id,
            'user': self.user.to_dict_basic(),
            'body': self.body
        }
