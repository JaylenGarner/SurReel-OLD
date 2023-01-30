from .db import db, environment, SCHEMA, add_prefix_for_prod


class MessageServerMember(db.Model):
    __tablename__ = 'message_server_members'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True)
    message_server_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('message_servers.id')), primary_key=True)

#     # Relationships
    user = db.relationship("User", foreign_keys=[user_id])
    message_server = db.relationship("MessageServer", foreign_keys=[message_server_id])

    def to_dict(self):
        return {
            "user_id": self.user_id,
            "message_server_id": self.message_server_id
        }

    def to_dict_basic(self):
        return {
            "user_id": self.user_id,
            "message_server_id": self.message_server_id
        }

    def to_dict_member(self):
        return {
            'member': self.user.to_dict_basic()
        }
