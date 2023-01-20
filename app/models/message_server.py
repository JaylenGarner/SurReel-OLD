from .db import db, environment, SCHEMA, add_prefix_for_prod
from .message_server_member import MessageServerMember


class MessageServer(db.Model):
    __tablename__ = 'message_servers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # User Relationship
    owner = db.relationship("User", back_populates= 'owned_message_servers')
    # members = db.relationship("MessageServerMember", foreign_keys=[MessageServerMember.user_id], back_populates= 'user')

    # Message Relationship
    messages = db.relationship("Message", back_populates= 'message_server', cascade='all,delete')

    # Message Server Member Relationship
    members = db.relationship("MessageServerMember", foreign_keys=[MessageServerMember.message_server_id], back_populates= 'message_server')

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id
        }

    def to_dict_basic(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id
        }
