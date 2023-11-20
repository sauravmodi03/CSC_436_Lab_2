const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TodoSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    isCompleted: { type: Boolean, required: true },
    dateCreated: { type: String, required: true },
    dateComplete: { type: String },
    author: { type: Schema.Types.ObjectId, ref: "User" }
});
//Export model
module.exports = mongoose.model("Todo", TodoSchema);