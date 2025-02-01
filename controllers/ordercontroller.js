import order from"../models/order.js";

import product from "../models/product.js";
import { isCustomer } from "./usercontroller.js";

export async function createorder(req,res){

    if(!isCustomer){
        res.json({
            message:"please iogin as customer to creat orders"
        })
    }
    
    try{

        const latestOrder = await order.find() .sort({date:-1}).limit(1)

        let orderId
        if(latestOrder.length==0){
            orderId="CBC0001"

        }else{
        const currentorderId = latestOrder[0].orderId

        const nuberString = currentorderId.replace("CBC","")

        const number = parseInt(nuberString)

       const newNumber = (number+1).toString().padStart(4,"0");
       orderId="CBC"+newNumber

        }

        const neworderData=req.body
const newProductArry=[]
for(let i=0;i<neworderData.orderedItem.length;i++){

    const product = await product.findone({
        productId:neworderData.orderedItems(i).productId
    })
    if(product==null){
        res.json({
            message:"product with id" +neworderData.orderedItems(i).productId+"not found"
        })
        return
    }
}
consol.log(product)


      // neworderData.orderId=orderId
      // neworderData.email=req.user.email

//const order = new order(neworderData)
//await order.save()
//res.json({
    //message:"order created"
//})


    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}
export async function getOrders(req,res){
try{
  const orders  = await order.find({email:req.user.email})  
  res.json(orders)

}catch (error){
    res.status(500).json({
        message:error.message
    })
}
}
    
