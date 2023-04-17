from app.models import db, Post, environment, SCHEMA


def seed_posts():
    moab = Post(
        owner_id = 1,
        caption='Moab 🏜️',
        media='https://surreel-app-images.s3.amazonaws.com/seed-images/moab.jpg'
    )
    newport = Post(
        owner_id = 2,
        caption='Newport vibes 🏖️',
        media='https://images.unsplash.com/photo-1582068385698-557043f8ed3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bmV3cG9ydHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60'
    )
    la = Post(
        owner_id = 3,
        caption='LA',
        media='https://images.unsplash.com/photo-1495430288918-03be19c7c485?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGxvcyUyMGFuZ2VsZXMlMjBoaWdod2F5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60'
    )
    nature = Post(
        owner_id = 3,
        caption='The great outdoors',
        media='https://i.giphy.com/media/12qHWnTUBzLWXS/giphy.webp'
    )
    peeps = Post(
        owner_id = 1,
        caption='Watch Hill with Peeps 🐶 🌅',
        media='https://surreel-app-images.s3.amazonaws.com/seed-images/sunset.jpg'
    )
    concert = Post(
        owner_id = 1,
        caption='The Weeknd in NYC',
        media='https://surreel-app-images.s3.amazonaws.com/seed-images/concert.jpg'
    )
    plane = Post(
        owner_id = 2,
        caption='🛫',
        media='https://images.unsplash.com/photo-1572204443441-3859041b6c88?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGxhbmUlMjB3aW5kb3d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60'
    )


    db.session.add(moab)
    db.session.add(newport)
    db.session.add(la)
    db.session.add(nature)
    db.session.add(peeps)
    db.session.add(concert)
    db.session.add(plane)

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
