from .db import db, environment, SCHEMA, add_prefix_for_prod


class Follow(db.Model):
    __tablename__ = 'follows'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    follower_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    followee_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)

    # Relationships
    follower = db.relationship("User", foreign_keys=[follower_id])
    followee = db.relationship("User", foreign_keys=[followee_id])

    def __repr__(self):
        return f"<ID: {self.id}, Follower ID: {self.follower_id}, Followee ID: {self.followee_id}>"

    def to_dict_following(self):
        return {
            'followee': self.followee.to_dict_posts()
        }

    def to_dict_follower(self):
        return {
            'follower': self.follower.to_dict_posts(),
        }

    def to_dict_basic_following(self):
        return {
            'followee': self.followee.to_dict_basic()
        }

    def to_dict_basic_follower(self):
        return {
            'follower': self.follower.to_dict_follow()
        }

    def to_dict_basic(self):
        return {
            "follower_id": self.follower_id,
            "followee_id": self.followee_id
        }
