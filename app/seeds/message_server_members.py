# from app.models import db, MessageServerMember, environment, SCHEMA


# def seed_message_server_members():
#     message_serv_mem1 = MessageServerMember(
#         user_id='1',
#         message_server_id='2'
#     )
#     message_serv_mem2 = MessageServerMember(
#         user_id='2',
#         message_server_id='1'
#     )
#     message_serv_mem3 = MessageServerMember(
#         user_id='3',
#         message_server_id='3'
#     )
#     message_serv_mem4 = MessageServerMember(
#         user_id='2',
#         message_server_id='3'
#     )
#     message_serv_mem5 = MessageServerMember(
#         user_id='1',
#         message_server_id='3'
#     )
#     db.session.add(message_serv_mem1)
#     db.session.add(message_serv_mem2)
#     db.session.add(message_serv_mem3)
#     db.session.add(message_serv_mem4)
#     db.session.add(message_serv_mem5)
#     db.session.commit()


# # Uses a raw SQL query to TRUNCATE or DELETE the message_server_members table. SQLAlchemy doesn't
# # have a built in function to do this. With postgres in production TRUNCATE
# # removes all the data from the table, and RESET IDENTITY resets the auto
# # incrementing primary key, CASCADE deletes any dependent entities.  With
# # sqlite3 in development you need to instead use DELETE to remove all data and
# # it will reset the primary keys for you as well.
# def undo_message_server_members():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.message_server_members RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute("DELETE FROM message_server_members")

#     db.session.commit()
