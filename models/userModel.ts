import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    password:{
        type:String,
        required:[true],
    },
    username: {
        type: String,
        required: [true]
    },
})



const UserDB= mongoose.models.auth || mongoose.model("auth",userSchema);

export default UserDB;