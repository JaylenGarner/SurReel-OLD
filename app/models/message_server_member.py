# from .db import db, environment, SCHEMA, add_prefix_for_prod

# message_server_members = db.Table(
#     "message_server_members",
#     db.Model.metadata,
#     db.Column('users', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True, nullable=False),
#     db.Column('message_servers', db.Integer, db.ForeignKey(add_prefix_for_prod('message_server.id')), primary_key=True, nullable=False)
# )

# if environment == "production":
#     followers.schema = SCHEMA
