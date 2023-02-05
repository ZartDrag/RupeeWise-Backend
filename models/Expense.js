const mongoose = require("mongoose");
const { Schema } = mongoose;

const expenseSchema = new Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    title: {
        type: String,
        required : true
    },
    type: String,
    amount: Number,
    category: String,
    date: { type: Date, default: Date.now },
    description: String,
    famMember: String
  });
  
  module.exports = mongoose.model("expense", expenseSchema);