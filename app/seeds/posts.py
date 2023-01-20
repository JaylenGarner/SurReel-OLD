from app.models import db, Post, environment, SCHEMA


def seed_posts():
    new_york = Post(
        owner_id = 1,
        caption='The big apple',
        media='https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3JTIweW9ya3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60'
    )
    newport = Post(
        owner_id = 2,
        caption='Newport RI',
        media='https://images.unsplash.com/photo-1582068385698-557043f8ed3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bmV3cG9ydHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60'
    )
    cat_pic = Post(
        owner_id = 3,
        caption='My cat Whiskers',
        media='https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60'
    )

    db.session.add(new_york)
    db.session.add(newport)
    db.session.add(cat_pic)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the posts table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM posts")

    db.session.commit()
