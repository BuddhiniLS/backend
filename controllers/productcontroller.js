import product from "../Models/product.js";

export function getProduct(req, res) {

    product.find().then(
        (productList) => {
            res.json({
                list: productList

            })
        }

    ).catch((error) => {
        res.json({
            message: "Error"

        })
    })
}

export function creatProduct(req, res) {

console.log(req.user)

if(req.user==null){
    res.json({
        message:"You are not logged in"
    } )
    return
}

if(req.user.type!="admin"){
    res.json({
        message:"You are not an admin"
    })
    return
}

    const newproduct = new product(req.body)

    newproduct.save()
        .then(() => {
            res.json({
                message: "Product created"

            })

        })
        .catch(() => {
            res.json({
                message: "Product not created"
            })
        });
}

export function deleteProduct(req, res) {
    product.deleteOne({ name: req.params.name })
        .then(() => {
            res.json({
                message: "Product deleted successfully"
            });
        })
        .catch(() => {
            res.json({
                message: "Product not deleted"
            });
        });
}

export function getProductByName(req,res){
    const name = req.params.name;

 product.find({ name: name }).then(
    (productList)=>{
        res.json({
        list: productList

        })
    }) .catch(
        ()=>{
            res.jes({
            message:"Error"    
            })
        })
}
