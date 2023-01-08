const mongoose = require("mongoose");
const { Schema } = mongoose;

const expenseSchema = new Schema({
    username:  {
        type: String,
        required: true
    }, 
    type: String,
    amount: Int32Array,
    category: String,
    date: { type: Date, default: Date.now },
    description: String,
    famMember: Array
  });

  module.exports = mongoose.model("expense", expenseSchema);