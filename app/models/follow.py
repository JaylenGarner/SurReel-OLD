from .db import db, environment, SCHEMA, add_prefix_for_prod


class Follow(db.Model):
    __tablename__ = 'follows'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    follower_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    followee_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)

    # Relationships
    follower = db.relationship("User", foreign_keys=[follower_id])
    followee = db.relationship("User", foreign_keys=[followee_id])

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
            'follower': self.follower.to_dict_basic()
        }
