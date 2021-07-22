const express = require("express");
const app = express.Router();
const {
  User_game,
  User_game_biodata,
  User_game_history,
} = require("../models");
const bcrypt = require("bcrypt");

// READ
app.get("/dashboard", (req, res) => {
  const msg = req.query.msg;

  if (req.query.user == "admin") {
    User_game.findAll({
      order: [["id", "ASC"]],
    }).then((user) =>
      res.status(200).render("dashboard", {
        title: "Dashboard Page",
        user,
        msg: msg,
      })
    );
  } else if (req.query.user != "admin") {
    res.redirect("/dashboard-user");
  }
});

// CREATE
app.post("/dashboard/add", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const userData = {
    username: req.body.username,
    password: hashedPassword,
  };

  User_game.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) =>
      !user
        ? User_game.create(userData)
            .then((user_game) => {
              User_game_biodata.create({
                user_id: user_game.get("id"),
              });
              User_game_history.create({
                user_id: user_game.get("id"),
              });
              res.status(201).redirect("/dashboard?user=admin&msg=created");
            })
            .catch((err) => {
              res.status(422).send("Cannot create user:", err);
            })
        : res.redirect("/dashboard?user=admin&msg=exist")
    )
    .catch((err) => res.send("ERROR: " + err));
});

// UPDATE
app.post("/dashboard/edit/:id", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const hashedPassword = await bcrypt.hash(password, 10);
  const userData = {
    username: username,
    password: hashedPassword,
  };

  const updateData = async (data) =>
    await User_game.update(data, { where: { id: req.params.id } })
      .then(() => {
        res.status(201).redirect("/dashboard?user=admin&msg=updated");
      })
      .catch((err) => res.status(422).send("Cannot update user: ", err));

  const findUsername = async (username) =>
    await User_game.findOne({
      where: {
        username: username,
      },
    });

  User_game.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((id) => {
      if (username != "" && password != "") {
        findUsername(username).then((dbUser) => {
          !dbUser
            ? updateData(userData)
            : res.redirect("/dashboard?user=admin&msg=error");
        });
      } else if (username != "" && password == "") {
        findUsername(username).then((dbUser) => {
          !dbUser
            ? updateData({ username: username })
            : res.redirect("/dashboard?user=admin&msg=error");
        });
      } else if (username == "" && password != "") {
        updateData({ password: hashedPassword });
      }
    })
    .catch((err) => res.send("ERROR: " + err));
});

// DELETE
app.post("/dashboard/delete/:id", (req, res) =>
  User_game.destroy({ where: { id: req.params.id } })
    .then(() => res.status(201).redirect("/dashboard?user=admin&msg=deleted"))
    .catch(() => res.status(422).send("Cannot delete the games id"))
);

// HANDLE REDIRECTION READ if any access this page
app.get("/dashboard/*", (req, res) =>
  User_game.findAll().then(() =>
    res.status(200).redirect("/dashboard?user=admin")
  )
);

module.exports = app;
