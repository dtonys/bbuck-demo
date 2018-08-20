# bbuck-demo

A demo to implement the website and api for bbuck.io

## Tech

- Firebase is the primary database
- Firebase accessible on server side API only
- Hosted on AWS micro-instance, deployments via a simple shell script

## Database Schema
- `friends`: List of friends, polled and updated every 3 seconds
  - key: `<epic_id>`:
  - values:
    - `epic_username`

- `pending_users`: Users who signed up but are not authenticated
  - key: `<epic_username>`:
  - values:
    - `epic_id`

- `users`: Authenticated users, they can log in to the website
  - key: `<username>`
  - values:
    - `email`
    - `password_hash`
    - `username`
    - `epic_username`
    - `epic_id`

  - `sessions`: The login session

## Authentication

A user becomes authenticated when they sign up, and add malcom's account as a friend.

The server will be polling malcom's account every 3 seconds to see if new friends are added.

The friends list will be stored in `friends` table, and will be updated whenever a new friend is detected.

As the friends list returns only the `epic_user_id`, and the user provides the `epic_username`, we need a way to connect the two.
We'll do a GET request to `https://fortniteapi.com/profile/<epic_username>/pc` to get the `epic_user_id` given an `epic_username`.

If a user signs up but is not on the friends list, they are stored in the `pending_users` table.

When a new friend is added in game, the polling will pick it up, and we'll convert the matching user in `pending_users` to a user, which is stored in `users`.  We will send the user a simple email to let them know they are authenticated, with a link to the login page.

If a user is already in `pending_users` when they sign up, they'll be authenticated immediately and logged in.


## API
| Method | Url            | Params| Notes |
| ------ | -------------- | ----- | ----- |
| POST   | /api/signup    | email, password, epic_username | Signup a user and log them in |
| POST   | /api/login     | email, password | Log a user in |
| GET    | /api/logout    | | Log a user out
| GET    | /api/session   | | Gets logged in user's data |

## Pages
| Url        | Description
| ---------- | -------------- |
| /          | Home page with login form |
| /signup    | Signup form    |
| /dashboard | Shows current balance and recent activity |


