const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    username:  {
        type: String,
        unique: true,
        required: true
    }, 
    password: {
        type: String,
        required: true
    },
    dateOfJoining: { type: Date, default: Date.now },
    contact: String,
    members: Array
  });

  module.exports = mongoose.model("user", userSchema);