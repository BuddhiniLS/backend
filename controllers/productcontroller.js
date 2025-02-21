import product from "../models/product.js";

import { isAdmin } from "./usercontroller.js";

export function creatproduct (req,res){

    if(!isAdmin(req)){
        res.json({
            message:"please iogin as administrator to add product"
        })

        return
    }
    const newProductData=req.body

    const product=new product(newProductData)
    product.save().then(()=>{
        res.json({
            message:"product created"
        })
    }).catch((error)=>{
        res.json({
            message:error
        })
    })
}

export function getProducts (req,res){
    product.find({}).then ((products)=>{
        res.json(products)
    })
}
