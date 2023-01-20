# from .db import db, environment, SCHEMA, add_prefix_for_prod


# class MessageServer(db.Model):
#     __tablename__ = 'message_servers'

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

#     # Relationships

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'owner_id': self.owner_id
#         }
