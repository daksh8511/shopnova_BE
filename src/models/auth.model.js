import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        min : 8
    },
    address : {
        area : String,
        city : String,
        state : String,
        pincode : Number
    }
},{
    timestamps : true
})

const AuthModel = mongoose.model('user', AuthSchema)

export default AuthModel