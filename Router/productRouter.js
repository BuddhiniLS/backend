import express from 'express';
import { deleteProduct, getProduct, creatProduct, getProductByName } from '../controllers/productcontroller.js';

const productRouter = express.Router();

productRouter.get('/',getProduct);

productRouter.get("/:name",getProductByName);

productRouter.get("/filter",(req,res) =>{
    res.json({
        message: "This is product filtering area"
    })
})

productRouter.post('/',creatProduct);
productRouter.delete("/:name",deleteProduct)

export default productRouter;