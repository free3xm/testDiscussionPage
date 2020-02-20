const { Router } = require("express");
const mongoose = require("mongoose");
const router = Router();
const Comment = require("./Models");
const findAllChilds = require("./utils");

router.post("/comments", async (req, res) => {
  try {
    const { user, text, reply } = req.body;
    const comment = Comment({
      _id: new mongoose.Types.ObjectId(),
      state: 0,
      user,
      text,
      created: new Date(),
      reply
    });
    await comment.save();
    const comments = await Comment.find({});
    res.status(201).json(comments);
  } catch (err) {
    res.status(500).json({ message: "Can't add new comment, server error" });
  }
});

router.get("/comments", async (req, res) => {
  try {
    const comments = await Comment.find({});
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: "Can't get comments, server error" });
  }
});

router.delete("/comments", async (req, res) => {
  try {
    const id = req.body.id;
    let comments = await Comment.find({});
    const itemsToDel = findAllChilds(comments, id);
    for (let item of itemsToDel) {
      await Comment.deleteOne({ _id: item });
    }
    comments = await Comment.find({});
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: "Can't delete comment, server error" });
  }
});

router.put("/comments", async (req, res) => {
  try {
    const _id = req.body._id;
    req.body.updateAt = new Date();
    await Comment.findOneAndUpdate({ _id }, { ...req.body });
    const comments = await Comment.find({});
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: "Can't update comment, server error" });
  }
});

router.put("/comments/state", async (req, res) => {
  try {
    const { _id, state } = req.body;
    await Comment.findOneAndUpdate({ _id }, { state });
    const comments = await Comment.find({});
    res.status(200).json(comments);
  } catch (err) {
    cres
      .status(500)
      .json({ message: "Can't update comment state, server error" });
  }
});
module.exports = router;
