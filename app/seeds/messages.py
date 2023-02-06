from app.models import db, Message, environment, SCHEMA


def seed_messages():
    message1 = Message(
        user_id = 1,
        message_server_id = 1,
        body='Suhhh dude',
        # media='https://i.kym-cdn.com/entries/icons/original/000/019/616/41584.jpg'
    )
    message2 = Message(
        user_id = 2,
        message_server_id = 2,
        body='You owe us... big time',
        # media='https://media.istockphoto.com/id/174879501/photo/irs-building-in-washington.jpg?s=612x612&w=0&k=20&c=4P9dxBYrG0VpPM4uy36OwFu38RpGVAP9dgDIZhiLq7c='
    )
    message3 = Message(
        user_id = 3,
        message_server_id = 3,
        body='I kinda look like Kid Rock',
        # media='https://images.unsplash.com/photo-1571933052606-a7fce275801f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fG9sZCUyMGNvd2JveXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
    )
    message4 = Message(
        user_id = 1,
        message_server_id = 3,
        body='I kinda look like Kid Rock too',
        # media='https://images.unsplash.com/photo-1571933052606-a7fce275801f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fG9sZCUyMGNvd2JveXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
    )


    db.session.add(message1)
    db.session.add(message2)
    db.session.add(message3)
    db.session.add(message4)

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
