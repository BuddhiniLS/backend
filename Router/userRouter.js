import express from "express";

import { creatuser, loginUser } from "../controllers/usercontroller.js";

const userRouter = express.Router();
userRouter.post ("/",creatuser)
userRouter.post("/login",loginUser)

export default userRouter;


