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

## Overview

SurReel is an Instagram clone. When a user first accesses the site, they are brought to the login page. On the login page, they are also presented with the option to navigate to the sign up page. Attempting to access any page on the site without login/signup will redirect them to login.
![imgonline-com-ua-twotoone-nS3QGu7CJNeU](https://user-images.githubusercontent.com/93837049/218271834-b108cfe4-a913-4a2b-80bb-9a4a0b96bb21.jpg)

When logging into the site, the user is greeted with their feed. The feed will contain the posts of other users that the current user follows. If the user is not following anyone, they are presented with the following message and a button that navigates them to a page that displays all of the application's users: "There are no posts in your feed, get started by following other users"

<img width="1113" alt="Screenshot 2023-02-11 at 12 23 33 PM" src="https://user-images.githubusercontent.com/93837049/218272084-e6c7b8a9-6ed7-4dd7-b8c9-a8d30c8ee563.png">

In the navbar there are links to the user's home feed, a form to create a post, a view of all of the user's direct messaging chats, and a list of of the application's current users.

If you click on a user's username or profile picture in most area's of the application, you will be redirected to that user's profile. While visiting a user's profile, you can see a display of all of their posts. Above the user's posts, there is an area that shows that user's total number of posts, followers, and following. A follow button is also present, and the functionality will change depending on the current user's relationship with the user.
- If neither user follows eachother: The button will display 'Follow'
- If the user is following the current user, but the current user is not following the user: The button will display 'Follow back'
- If the current user follows the user: The button will display 'Unfollow'

<img width="1245" alt="Screenshot 2023-02-11 at 12 54 01 PM" src="https://user-images.githubusercontent.com/93837049/218273315-6ab8fcf2-a08a-4bec-a1cd-2672fb0d8288.png">

