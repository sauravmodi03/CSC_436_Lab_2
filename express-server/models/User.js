const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    todos: [{ type: Schema.Types.ObjectId, ref: "Todo" }],
});
//Export model
module.exports = mongoose.model("User", UserSchema);