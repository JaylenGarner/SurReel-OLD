from .db import db, environment, SCHEMA, add_prefix_for_prod


class Message(db.Model):
    __tablename__ = 'messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    # user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    # message_server_id = db.Column(db.Integer, db.ForeignKey('message_servers.id'), nullable=False)
    body = db.Column(db.String(255), nullable=False)
    media = db.Column(db.String(255), nullable=True)

    # Relationships

    def to_dict(self):
        return {
            'id': self.id,
            'body': self.body,
            # 'user_id': self.user_id,
            # 'message_server_id': self.message_server.id,
            'media': self.media
        }
