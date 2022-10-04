const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required : true,
        min:3,
        max:20,
        unique:true
    },
    borrowBooks:{
        type:Array,
        default:[]
    },
    returnBooks:{
        type:Array,
        default:[]
    },

},
{timestamps:true}
);

module.exports = mongoose.model("User",UserSchema);