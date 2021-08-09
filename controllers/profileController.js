const {
  User_game,
  User_game_biodata,
  User_game_history,
} = require("../models");

module.exports = {
  index: async (req, res) => {
    const msg = req.query.msg;
    const username = req.query.user;
    await User_game.findOne({
      where: {
        username: username,
      },
      include: [
        {
          model: User_game_biodata,
        },
        {
          model: User_game_history,
        },
      ],
    }).then((user) => {
      user
        ? res.status(200).render("profile", {
            title: "My Profile",
            user: user.User_game_biodata[0],
            history: user.User_game_histories[0],
            msg: msg,
            username: username,
            style: "dashboard",
          })
        : res.status(200).redirect("/");
    });
  },

  update: async (req, res, next) => {
    const full_name = req.body.full_name;
    const email = req.body.email;
    const userId = req.body.userId;

    const updateData = async (data) =>
      await User_game_biodata.update(data, { where: { user_id: userId } })
        .then(() =>
          res
            .status(201)
            .redirect("/profile?msg=updated&user=" + req.query.user)
        )
        .catch((err) => res.status(422).next("Cannot update user: ", err));

    if (full_name != "" && email != "") {
      updateData({
        full_name: full_name,
        email: email,
      });
    } else if (full_name != "" && email == "") {
      updateData({ full_name: full_name });
    } else if (full_name == "" && email != "") {
      updateData({ email: email });
    } else {
      res.status(201).redirect("/profile?user=" + req.query.user);
    }
  },
};
