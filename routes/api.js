const express = require("express");
const app = express();
const {
  User_game,
  User_game_biodata,
  User_game_history,
} = require("../models");

/**
 * There are 2 version of API
 *
 * /v1/ => simple CRUD for user_game table
 * /v2/ => CRUD with joined 3 tables using user_id as Parent Key.
 *          - user_game
 *          - user_game_biodata
 *          - user_game_history
 *
 */

// API V1
// CREATE /user
app.post("/v1/users", (req, res) =>
  User_game.create({
    username: req.body.username,
    password: req.body.password,
  })
    .then((user) => res.status(201).json(user))
    .catch(() => res.status(422).send("Cannot create user"))
);

// READ /user
app.get("/v1/users", (req, res) =>
  User_game.findAll().then((user) =>
    user.length == 0
      ? res.status(200).send("No users yet!")
      : res.status(200).json(user)
  )
);

// READ /user/:id
app.get("/v1/users/:id", (req, res) =>
  User_game.findOne({ where: { id: req.params.id } }).then((user) =>
    user ? res.status(200).json(user) : res.status(200).send("ID not found")
  )
);

// Update /user/:id
app.put("/v1/users/edit/:id", (req, res) =>
  User_game.update(
    {
      username: req.body.username,
      password: req.body.password,
    },
    { where: { id: req.params.id } }
  )
    .then((user) => res.status(201).json("User updated !"))
    .catch(() => res.status(422).send("Cannot update the user"))
);

// Delete /user/:id
app.delete("/v1/users/delete/:id", (req, res) =>
  User_game.destroy({ where: { id: req.params.id } })
    .then(() =>
      res.status(201).json({
        message: `Users id of ${req.params.id} has been deleted!`,
      })
    )
    .catch(() => res.status(422).send("Cannot delete the user id"))
);

// READ /user/profile
app.get("/v1/profile", (req, res) =>
  User_game_biodata.findAll({
    include: [
      {
        model: User_game,
      },
    ],
  })
    .then((row) =>
      row.length == 0
        ? res.status(200).send("No users yet!")
        : res.status(200).json(row)
    )
    .catch((err) => res.status(500).send("Error : " + err))
);

// READ /user/profile
app.get("/v1/profile", (req, res) =>
  User_game_biodata.findAll({
    include: [
      {
        model: User_game,
      },
    ],
  })
    .then((row) =>
      row.length == 0
        ? res.status(200).send("No users yet!")
        : res.status(200).json(row)
    )
    .catch((err) => res.status(500).send("Error : " + err))
);

// READ /user/profile/:id
app.get("/v1/profile/:id", (req, res) =>
  User_game_biodata.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: User_game,
      },
    ],
  }).then((user) =>
    user ? res.status(200).json(user) : res.status(200).send("ID not found")
  )
);

// READ /user/history
app.get("/v1/history", (req, res) =>
  User_game_history.findAll({
    include: [
      {
        model: User_game,
      },
    ],
  })
    .then((row) =>
      row.length == 0
        ? res.status(200).send("No users yet!")
        : res.status(200).json(row)
    )
    .catch((err) => res.status(500).send("Error : " + err))
);

// READ /user/history/:id
app.get("/v1/history/:id", (req, res) =>
  User_game_history.findOne({
    where: { user_id: req.params.id },
    include: [
      {
        model: User_game,
      },
    ],
  }).then((user) =>
    user ? res.status(200).json(user) : res.status(200).send("ID not found")
  )
);

// API V2
// CREATE /user
app.post("/v2/users", (req, res) =>
  User_game.create({
    username: req.body.username,
    password: req.body.password,
  })
    .then((user_game) => {
      User_game_biodata.create({
        user_id: user_game.get("id"),
      });
      User_game_history.create({
        user_id: user_game.get("id"),
      });
    })
    .then((user) => res.status(201).json(user))
    .catch(() => res.status(422).send("Cannot create user"))
);

// READ /user
app.get("/v2/users", (req, res) =>
  User_game.findAll({
    include: [
      {
        model: User_game_biodata,
      },
      {
        model: User_game_history,
      },
    ],
  }).then((user) =>
    user.length == 0
      ? res.status(200).send("No users yet!")
      : res.status(200).json(user)
  )
);

// READ /user/:id
app.get("/v2/users/:id", (req, res) =>
  User_game.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: User_game_biodata,
      },
      {
        model: User_game_history,
      },
    ],
  }).then((user) =>
    user ? res.status(200).json(user) : res.status(200).send("ID not found")
  )
);

// Update /users/edit/:id
app.put("/v2/users/edit/:id", (req, res) =>
  User_game.update(
    {
      username: req.body.username,
      password: req.body.password,
    },
    { where: { id: req.params.id } }
  )
    .then(() => {
      User_game_biodata.update(
        {
          full_name: req.body.full_name,
          email: req.body.email,
        },
        { where: { user_id: req.params.id } }
      );
      User_game_history.update(
        {
          win: req.body.win,
          lose: req.body.lose,
        },
        { where: { user_id: req.params.id } }
      );
    })
    .then((user) => res.status(201).json(user))
    .catch(() => res.status(422).send("Cannot update user"))
);

// Delete /users/delete/:id
app.delete("/v2/users/delete/:id", (req, res) =>
  User_game.destroy({ where: { id: req.params.id } })
    .then(() =>
      res.status(201).json({
        message: `Users id of ${req.params.id} has been deleted!`,
      })
    )
    .catch(() => res.status(422).send("Cannot delete the user id"))
);

module.exports = app;
