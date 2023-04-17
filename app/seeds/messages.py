from app.models import db, Message, environment, SCHEMA


def seed_messages():
    message1 = Message(
        user_id = 2,
        message_server_id = 1,
        body="We've been trying to reach you regarding your vehicle's extended warrantee",
    )
    message2 = Message(
        user_id = 1,
        message_server_id = 1,
        body="no",
    )
    message3 = Message(
        user_id = 3,
        message_server_id = 3,
        body="Hey how've you been?",
    )
    message4 = Message(
        user_id = 1,
        message_server_id = 3,
        body='Not too shabby',
    )
    message5 = Message(
        user_id = 3,
        message_server_id = 3,
        body='Nice',
    )


    db.session.add(message1)
    db.session.add(message2)
    db.session.add(message3)
    db.session.add(message4)
    db.session.add(message5)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the messages table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM messages")

    db.session.commit()
