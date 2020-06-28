const express = require("express");
const router = express.Router();
const members = require("../../Members");
const uuid = require("uuid");

//gets all members
router.get("/", (req, res) => res.json(members));

//get single member
router.get("/:id", (req, res) => {
  const found = members.some((member) => member.id === +req.params.id);

  if (found) {
    res.json(members.filter((member) => member.id === +req.params.id));
  } else {
    res.status(400).json({
      msg: `No member with id ${req.params.id}`,
    });
  }
});

//create a member
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: "please include a name and email" });
  }

  members.push(newMember);
  // res.json(members);
  res.redirect("/");
});

//update Member
router.put("/:id", (req, res) => {
  const found = members.some((member) => member.id === +req.params.id);

  if (found) {
    const updMember = req.body;
    members.forEach((m) => {
      if (m.id === parseInt(req.params.id)) {
        m.name = updMember.name ? updMember.name : m.name;
        m.email = updMember.email ? updMember.email : m.email;

        res.json({ msg: "member updated", m });
      }
    });
  } else {
    res.status(400).json({
      msg: `No member with id ${req.params.id}`,
    });
  }
});

//Delete Member
router.delete("/:id", (req, res) => {
  const found = members.some((member) => member.id === +req.params.id);

  if (found) {
    res.json({
      msg: "member deleted",
      members: members.filter((member) => member.id !== +req.params.id),
    });
  } else {
    res.status(400).json({
      msg: `No member with id ${req.params.id}`,
    });
  }
});

module.exports = router;
