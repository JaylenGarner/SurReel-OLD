# from .db import db, environment, SCHEMA, add_prefix_for_prod

# followers = db.Table(
#     "followers",
#     db.Model.metadata,
#     db.Column('users', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True, nullable=False),
#     db.Column('users', db.Integer, db.ForeignKey(add_prefix_for_prod('users.follower_id')), primary_key=False, nullable=False)
# )

# if environment == "production":
#     followers.schema = SCHEMA
