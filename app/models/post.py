# from .db import db, environment, SCHEMA, add_prefix_for_prod


# class Post(db.Model):
#     __tablename__ = 'posts'

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#     caption = db.Column(db.String(255), nullable=True)
#     media = db.Column(db.String(255), nullable=False)

#     # Relationships

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'caption': self.caption,
#             'owner_id': self.owner_id,
#             'media': self.media
#         }
