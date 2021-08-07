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

API can be accessed from such endpoints:

#### API V1

- Get all users : GET <code>/v1/users</code>
- Create a user : POST <code>/v1/users</code>
- Edit a user : PUT <code>/v1/users/edit/:id</code>
- Delete a user : DELETE <code>/v1/users/delete/:id</code>

#### API V2

- Get all users, profile and history : GET <code>/v2/users</code>
- Create a user : POST <code>/v2/users</code>
- Edit a user : PUT <code>/v2/users/edit/:id</code>
- Delete a user : DELETE <code>/v2/users/delete/:id</code>

- Get games history : GET <code>/v2/games</code>

### CHORE

- Send update to user history table after games
- Multiplayer feature (WIP)
