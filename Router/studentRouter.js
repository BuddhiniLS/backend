import express from "express";


import { getStudents,creatStudent, deleteStudent } from "../controllers/studentcontroller.js";

const studentRouter = express.Router();

// GET request handler
studentRouter.get("/", getStudents)


// POST request handler
studentRouter.post("/",creatStudent)

// delete request handler
studentRouter.delete("/",deleteStudent)

export default studentRouter;
