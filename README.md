# Binar Challenge Chapter 7 Fullstack Web

### Create a web app using MVC architecture by using these technology :

- Express JS
- EJS View Engine
- RDBMS using Sequelize
- Bcrypt for password
- Postgres

### How to use :

Make sure you have installed sequelize-cli

- <code>yarn</code>
- <code>sequelize db:migrate</code>
- <code>sequelize db:seed:all</code>
- <code>yarn start</code>
- Login as admin to access admin dashboard
  - Username : admin
  - Passwrod : admin

### API

API can be accessed from such endpoints, by using auth token. <strong>Generate your auth token from register or login using admin</strong>, check your token from /whoami

#### API V2

- Get all users : GET <code>/api/v2/users</code>
- Get all room : GET <code>/api/v2/rooms</code>
- Get a user : GET <code>/api/v2/user/:id</code>
- Get a room : GET <code>/api/v2/room/:room</code>

##### USERS

- Create user : POST <code>/api/v2/auth/register</code>
- Edit a user : PUT <code>/api/v2/user/edit/:id</code>
- Delete a user : DELETE <code>/api/v2/user/delete/:id</code>
- Login user : POST <code>/api/v2/auth/login</code>
- Check your token : GET <code>api/v2/whoami</code>

##### GAMES

- Create a room : POST <code>/api/v2/room/create</code>
- Join room : POST <code>/api/v2/room/:room/join</code>

### CHORE

- Send update to user history table after games
- Multiplayer feature (WIP)
