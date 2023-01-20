from .db import db, environment, SCHEMA, add_prefix_for_prod


class Post(db.Model):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    caption = db.Column(db.String(255), nullable=True)
    media = db.Column(db.String(255), nullable=False)

    # User Relationship
    owner = db.relationship("User", back_populates= 'my_posts')

    # Like Relationship
    likes = db.relationship("Like", back_populates='post')

    def to_dict(self):
        return {
            'id': self.id,
            'caption': self.caption,
            'owner_id': self.owner_id,
            'media': self.media,
            'owner': self.owner.to_dict_basic(),
            'likes': [like.to_dict() for like in self.likes]
        }

    def to_dict_basic(self):
        return {
            'id': self.id,
            'caption': self.caption,
            'owner_id': self.owner_id,
            'media': self.media,
        }
