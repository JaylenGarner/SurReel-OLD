from app.models import db, Comment, environment, SCHEMA


def seed_comments():
    comment1 = Comment(
        user_id = 2,
        post_id = 1,
        body = 'What a view'
    )
    comment2 = Comment(
        user_id = 3,
        post_id = 5,
        body = 'Cute dog!'
    )
    comment3 = Comment(
        user_id = 3,
        post_id = 1,
        body = 'Love it!!'
    )
    comment4 = Comment(
        user_id = 3,
        post_id = 6,
        body = 'Take me with you!!!'
    )

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the comments table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()
