const { User_game, User_game_biodata } = require("../models");

module.exports = {
  index: (req, res) => {
    const msg = req.query.msg;
    const username = req.query.user;
    User_game.findOne({
      where: {
        username: username,
      },
    }).then((result) => {
      result
        ? User_game_biodata.findOne({
            where: {
              user_id: result.get("id"),
            },
          }).then((user) =>
            res.status(200).render("dashboard-user", {
              title: "Dashboard User",
              user,
              msg: msg,
              username: username,
            })
          )
        : res.status(200).redirect("/");
    });
  },
  update: async (req, res) => {
    const fullname = req.body.fullname;
    const email = req.body.email;
    const userId = req.body.userId;

    const userData = {
      fullname: fullname,
      email: email,
    };

    const updateData = async (data) =>
      await User_game_biodata.update(data, { where: { user_id: userId } })
        .then(() => {
          res.status(201).redirect(`/dashboard-user?user=${user}&msg=updated`);
        })
        .catch((err) => res.status(422).send("Cannot update user: ", err));

    if (fullname != "" && email != "") {
      findUsername(fullname).then((dbUser) => {
        !dbUser
          ? updateData(userData)
          : res.redirect(`/dashboard-user?user=${user}&msg=error`);
      });
    } else if (fullname != "" && email == "") {
      findUsername(fullname).then((dbUser) => {
        !dbUser
          ? updateData({ fullname: fullname })
          : res.redirect(`/dashboard-user?user=${user}&msg=error`);
      });
    } else if (fullname == "" && email != "") {
      updateData({ email: email });
    }
  },
};
