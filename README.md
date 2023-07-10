# [Mocha](https://mocha-sheldon.netlify.app/)
## Front-end
This is the front-end for the social media app: Mocha.
This app has been designed using React(front-end), express(middleware and backend) and MongoDB Atlas.
The functionality of this app is inspired by Twitter.

## Screens
- Authentication (Login, Signup) Pages
- Profile Page
- Home Page
- Explore Page
- Bookmarks Page
- Liked Posts Page
- Single Post Page
- 404 (Not Found) Page

## Features
- Create a user either by using email/password or phone number/date of birth combo.
- Authentication using JWT tokens for users.
- User can create, edit and delete posts.
- Users can add upto 5 images/videos and edit them if required. Uniqueness check is present if two media have the same link.
- User can like/dislike and bookmark a post.
- User can follow/unfollow other users.
- User can search for other users based on username or display name. Suggestions are provided on each keystroke.
- Home Page where all posts by following users are displayed. Posts can be sorted by trending or newest.
- Explore Page where posts of all users are shown. Posts can be sorted by trending or newest.
- On clicking a comment post, parent and children posts are also shown for that post.
- Users who liked/bookmarked a post are shown.
- Alerts to notify users on success/failure
- Loader to load data
- All pages are responsive.

## Tech Stack and Tools
- React, Pure CSS, Popper
- React Router v6
- Git For Version Control
- Netlify for Deployment
- Cloudinary for Image and Video Storage
