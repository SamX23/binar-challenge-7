# Binar Challenge Chapter 7 Fullstack Web

### Create fullstack app using MVC architecture and such technology :

- Node JS (Express JS)
- EJS View Engine
- Bcrypt
- Passport auth
- RDBMS using Sequelize
- Postgres datatable

### How to use :

Browser games can only play as single player, multiplayer available on API Endpoints but still limited(WIP).
Make sure you have installed sequelize-cli

- <code>yarn</code>
- <code>sequelize db:migrate</code>
- <code>sequelize db:seed:all</code>
- <code>yarn start</code>
- Login as admin to access admin dashboard
  - Username : admin
  - Passwrod : admin

### Info

API can be accessed from such endpoints, by using auth token. <strong>Generate your auth token from register or login using admin</strong>, check your token from /whoami.

Table room and user can only accessed using admin token.

### API

---

#### User Table (User, Biodata, History)

---

Access using admin token.

- Get all users : GET <code>/api/v2/users</code>
- Get a user : GET <code>/api/v2/user/:id</code>
- Create user : POST <code>/api/v2/auth/register</code>
- Edit a user : PUT <code>/api/v2/user/edit/:id</code>
- Delete a user : DELETE <code>/api/v2/user/delete/:id</code>

---

#### Room Table

---

Access using admin token.

- Get all room : GET <code>/api/v2/rooms</code>
- Get a room : GET <code>/api/v2/room/:room</code>

---

#### Games

---

Login using user auth token or insert username & password.

- Login user : POST <code>/api/v2/auth/login</code>
- Check your token : GET <code>/api/v2/whoami</code>

Room always created by player one, and player two must join the room, access this endpoint using player or admin token.

- Create a room : POST <code>/api/v2/room/create</code>
- Join room : POST <code>/api/v2/room/:room/join</code>
- Play in room : POST <code>/api/v2/room/:room/play</code>
- Get room result : GET <code>/api/v2/room/:room/result</code>

### CHORE

- Multiplayer feature (WIP)
