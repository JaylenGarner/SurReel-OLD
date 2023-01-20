# from .db import db, environment, SCHEMA, add_prefix_for_prod

# # message_server_members = db.Table(
# #     "message_server_members",
# #     db.Model.metadata,
# #     db.Column('users', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True, nullable=False),
# #     db.Column('message_servers', db.Integer, db.ForeignKey(add_prefix_for_prod('message_server.id')), primary_key=True, nullable=False)
# # )

# # if environment == "production":
# #     message_server_members.schema = SCHEMA

# # from .db import db, environment, SCHEMA, add_prefix_for_prod


# class MessageServerMember(db.Model):
#     __tablename__ = 'message_server_members'

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
#     message_server_id = db.Column(db.Integer, db.ForeignKey('message_servers.id'), primary_key=True)

#     # Relationships
#     user = db.relationship("User", foreign_keys=[user_id])
#     message_server = db.relationship("MessageServer", foreign_keys=[message_server_id])

#     def to_dict(self):
#         return {
#             "user_id": self.user_id,
#             "message_server_id": self.message_server_id
#         }
