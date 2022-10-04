const mongoose = require("mongoose")

const BookSchema = new mongoose.Schema({
    name:{
        type:String,
        required : true,
        min:3,
        max:20,
        unique:true
    },
    userId: {
        type: String
    },
},
{timestamps:true}
);

module.exports = mongoose.model("Book",BookSchema);