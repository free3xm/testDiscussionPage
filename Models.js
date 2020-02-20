const { Schema, model } = require("mongoose");

const schema = new Schema({
  _id: Schema.Types.ObjectId,
  state: { type: Number },
  user: { type: String },
  text: { type: String },
  created: { type: Date },
  updateAt: { type: Date },
  reply: { type: String, default: "" }
});

module.exports = model("Comment", schema);
