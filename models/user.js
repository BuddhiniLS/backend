import mongoose from "mongoose";
const userschema = mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },

    firstName : {
        type:String,
        required:true
    },

    lastName : {
        type:String,
        required:true
    },

    password : {
        type:String,
        required:true
    },

    isBlocked : {
        type:Boolean,
        default:false
    },

    type:{
        type:String,
        default : "customer"
    },

    profiledpicture :{
        type:String,
        default:"https://www.freepik.com/icon/user_10948922#fromView=keyword&page=1&position=55&uuid=335d0e7b-32b8-4c7f-93b5-e8f48e106f7d"
    },
}) 

const User = mongoose.model("users",userschema)

//export default dana ewa hama welama Capital letter ekakin patn gnn object ekk nisa 
// anith than wala reuse weddi confusion ekak wenwa ekai prashne wela thibbe 
// user, product, use krnn epa
// User, Product wage user krnna
export default User;
