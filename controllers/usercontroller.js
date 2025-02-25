import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()


export function creatuser(req, res) {

    const newUserData = (req.body)

    if(newUserData.type =="admin"){
        if(req.user==null ){
            res.json({
                message:"please login as administrator to create admin accounts"
            })
            return
            
        }
        if(req.user.type!="admin"){
            if(req.user==null ){
                res.json({
                    message:"please login as administrator to create admin accounts"
                })
                return
            }
        }
    }

    newUserData.password = bcrypt.hashSync(newUserData.password, 10)


    const user = new User(newUserData)
    user.save().then(() => {
        res.json({
            message: "user created"

        }
        )
    }).catch(() => {
        res.json({
            message: "user not created"
        })
    })

    }
export function loginUser(req, res) {
    User.find({ email: req.body.email }).then(
        (Users)=>{
            if (User.length == 0){
                res.json({
                    message: "user not found"
                 })
            } else{
                const user = Users[0]
            const isPasswordCorrect = bcrypt.compareSync(req.body.password,user.password)
    
            if(isPasswordCorrect){

                const token = jwt.sign({
                    email:user.email,
                    firstName:user.firstName,
                    lastName:user.lastName,
                    isBlocked:user.isBlocked,
                    type:user.type,
                    profilepicture:user.profilepicture},process.env.SECRET)
                
                res.json({
                    message:"user logged in",
                    token:token
                })
                
            } else{
                res.json({
                    message:"user not logger in (worng password)"
                })
            }
            } 

        })

}
