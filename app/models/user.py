from .db import db, environment, SCHEMA, add_prefix_for_prod
from .follow import Follow
from sqlalchemy.event import listens_for
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin



class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    image = db.Column(db.String(255), nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)

    # Follower relationships
    following = db.relationship("Follow", foreign_keys=[Follow.follower_id], back_populates='follower')
    followers = db.relationship("Follow", foreign_keys=[Follow.followee_id], back_populates='followee')

    # Post relationship
    my_posts = db.relationship("Post", back_populates= 'owner', cascade='all,delete')

    # Like relationship
    # Potential bonus feature (Liked Posts) !!!
    liked_posts = db.relationship("Like", back_populates= 'user', cascade='all,delete')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'image': self.image,
            'following': [following.to_dict_following() for following in self.following],
            'followers': [follower.to_dict_follower() for follower in self.followers],
            'posts': [post.to_dict_basic() for post in self.my_posts]
        }

    def to_dict_basic(self):
        return {
            'id': self.id,
            'username': self.username,
            'image': self.image
        }
