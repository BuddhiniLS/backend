import express from "express";
import { createorder, getOrders } from "../controllers/ordercontroller.js";

const orderRouter = express.Router();

orderRouter.post("/",createorder)
orderRouter.get("/",getOrders)

export default orderRouter;