# from app.models import db, MessageServer, environment, SCHEMA


# def seed_message_servers():
#     message_serv1 = MessageServer(
#         owner_id='1'
#     )
#     message_serv2 = MessageServer(
#         owner_id='2'
#     )
#     message_serv3 = MessageServer(
#         owner_id='3'
#     )

#     db.session.add(message_serv1)
#     db.session.add(message_serv2)
#     db.session.add(message_serv3)
#     db.session.commit()


# # Uses a raw SQL query to TRUNCATE or DELETE the message_servers table. SQLAlchemy doesn't
# # have a built in function to do this. With postgres in production TRUNCATE
# # removes all the data from the table, and RESET IDENTITY resets the auto
# # incrementing primary key, CASCADE deletes any dependent entities.  With
# # sqlite3 in development you need to instead use DELETE to remove all data and
# # it will reset the primary keys for you as well.
# def undo_message_servers():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.message_servers RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute("DELETE FROM message_servers")

#     db.session.commit()
