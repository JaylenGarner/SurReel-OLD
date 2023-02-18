# SurReel

By _[Jaylen Garner](https://github.com/JaylenGarner)_

## Index

- [API Documentation](https://github.com/JaylenGarner/SurReel/wiki/API-Routes)
- [Database Schema](https://github.com/JaylenGarner/SurReel/wiki/Database-Schema)
- [Frontend Routes](https://github.com/JaylenGarner/SurReel/wiki/Frontend-Routes)
- [MVP Feature List](https://github.com/JaylenGarner/SurReel/wiki/MVP-List)
- [User Stories](https://github.com/JaylenGarner/SurReel/wiki/User-Stories)

## Technologies Used

- JavaScript
- React/Redux
- CSS
- Python
- Flask/SQLAlchemy
- PostgreSQL (production)
- SQLite3 (development)
- AWS S3 (Uploading images)

## Overview

### Login/Signup
SurReel is an Instagram clone. When a user first accesses the site, they are brought to the login page. On the login page, they are also presented with the option to navigate to the sign up page, as well as the option to sign in as the 'Demo' user. Attempting to access any page on the site without login/signup will redirect them to login.

![imgonline-com-ua-twotoone-nS3QGu7CJNeU](https://user-images.githubusercontent.com/93837049/218271834-b108cfe4-a913-4a2b-80bb-9a4a0b96bb21.jpg)

### Feed
When logging into the site, the user is greeted with their feed. The feed will contain the posts of other users that the current user follows. If the user is not following anyone, they are presented with the following message and a button that navigates them to a page that displays all of the application's users: "There are no posts in your feed, get started by following other users"

<img width="1113" alt="Screenshot 2023-02-11 at 12 23 33 PM" src="https://user-images.githubusercontent.com/93837049/218272084-e6c7b8a9-6ed7-4dd7-b8c9-a8d30c8ee563.png">

The user can like and unlike posts in the feed by clicking on the heart icon beneath a post's image. If they select 'Likes' under a post's image, a modal will overlay the page and list the relevant users.

<img width="492" alt="Screenshot 2023-02-11 at 1 13 53 PM" src="https://user-images.githubusercontent.com/93837049/218274506-69961d5b-bb5d-45f0-9edc-e6af1bcd1b7f.png">

### Navigation Bar

In the navbar there are links to the user's home feed, a form to create a post, a view of all of the user's direct messaging chats, and a list of of the application's current users.

### Profile

If you click on a user's username or profile picture in most area's of the application, you will be redirected to that user's profile. While visiting a user's profile, you can see a display of all of their posts. Above the user's posts, there is an area that shows that user's total number of posts, followers, and following. A follow button is also present, and the functionality will change depending on the current user's relationship with the user.
- If neither user follows eachother: The button will display 'Follow'
- If the user is following the current user, but the current user is not following the user: The button will display 'Follow back'
- If the current user follows the user: The button will display 'Unfollow'

<img width="1245" alt="Screenshot 2023-02-11 at 12 54 01 PM" src="https://user-images.githubusercontent.com/93837049/218273315-6ab8fcf2-a08a-4bec-a1cd-2672fb0d8288.png">

If you click on either 'followers' or 'following', a modal will overlay the page and list the relevant users.

![imgonline-com-ua-twotoone-839SyaSB6Cg86KiC](https://user-images.githubusercontent.com/93837049/218273906-27efa4fe-275b-4606-a86f-47908aa98b97.jpg)

If you select any of the displayed posts, you will be redirected to that post's page. 

### Post Page

This page will display the image at a much larger size, show the caption, allow the user to like the post, and allow the user to view all of the post's likes.

<img width="1080" alt="Screenshot 2023-02-11 at 1 23 27 PM" src="https://user-images.githubusercontent.com/93837049/218274843-db8bc61b-5cff-416b-b022-83fdc5a55f4f.png">


### Create a Post

When the user selects 'Create a Post' in the nav bar, they will be redirected to a form that allows them to create a post. The form allows the user to select an image file from their system, as well as set a caption. Upon submission the user will see 'Loading...' until the image uplaods to the S3 bucket, once complete the user will be redirected to their home feed.

<img width="1031" alt="Screenshot 2023-02-11 at 1 35 00 PM" src="https://user-images.githubusercontent.com/93837049/218275241-4b386363-17b5-42c1-9394-8da7a51836e5.png">




