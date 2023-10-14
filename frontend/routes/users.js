const express = require("express");
const router = express.Router();

//router.use(logger);

// router.get("/", (req, res) => {
//   res.render("users");
// });
// router.get("/login", (req, res) => {
//   res.render("login");
// });
// router.get("/post", (req, res) => {
//   res.render("post");
// });
router.get("/settings", (req, res) => {
  res.render("settings");
});
// router.get("/settings/notifications", (req, res) => {
//   res.render("notifications");
// });
/*
router.post("/", (req, res) => {
  //input user login
  const isValid = false;
  if (isValid) {
    users.push({ username: req.body.username });
    res.redirect("/");
  } else {
    res.render("login", { username: req.body.username });
  }
});
*/
/*
router.get("/:username", (req, res) => {
  res.send(`user profile: ${req.params.username}`);
});

const users = [{ name: "Blank" }, { name: "Blank2" }];
*/
module.exports = router;
