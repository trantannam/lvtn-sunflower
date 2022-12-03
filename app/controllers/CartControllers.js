const { model } = require("mongoose");
const { populate } = require("../models/Cart");
const Cart = require("../models/Cart");

const cartController = {

    //get cart
    getCart: async (req, res) => {
        try {
            const listCart = await Cart.findOne(req.body).populate({path: "product", populate: {path: "productID"}} );
            // console.log("listCart",listCart)
            if (listCart === null) {
                res.json({success: false,message: "Customer not found"});
            } else {
                res.status(200).json({ success: true, message: "Successfully!", listCart });
            }
            console.log(req.body)
        } catch (error) {
            res.status(404).json(error);
        }
    },

    //Create and add product to cart
    createCart: async (req, res) => {
        try {
            const item = new Cart(req.body);
            const cart = await item.save();
            console.log("createCart",req.body);
            res.status(200).json({ message: "Add to cart successfully", cart });
        } catch (error) {
            res.status(404).json(error);
        }
    },

    //Add to cart
    addToCart: async (req, res) => {
        try {
            const cart = await Cart.findById(req.body._id);
            const data = {
                productID: req.body.product.productID,
                quantity: req.body.product.quantity
            }
            cart.product.push(data);// Neu push loi, them index mang
            await cart.save();
            await res.status(200).json({ success: true, message: "Successfully!", cart });
            console.log("addToCart",req.body);
        } catch (error) {
            res.status(404).json(error);
        }
    },

    //Update product in cart (update quantity)
    updateCart: async (req, res) => {

        try {
            const newCart = await Cart.findById(req.body._id);
            await newCart.updateOne(req.body);
            await newCart.save();
            const cart = await Cart.findById(req.body._id).populate({path: "product", populate: {path: "productID"}} );
            await res.status(200).json({ message: "Update cart successfully", cart });
            // console.log("updateCart", cart);
            // console.log("req.body",req.body);
        } catch (error) {
            res.status(404).json(error);
        }
    },

    //Delete product in cart
    deleteCart: async (req, res) => {
        try {
            const cart = await Cart.findById(req.body._id).populate({path: "product", populate: {path: "productID"}} );
            console.log(req.body);
            let inArr = null;
            // const newCart = cart.product.filter(item => item !== req.body.product[0]);
            cart.product.map((item, index)=>{
                if(item._id.toString() === req.body.product._id){
                    inArr = index;
                    console.log("inArr",inArr)
                }
            })
            console.log("inArr",inArr)
            if(inArr !== null){
                cart.product.splice(inArr, 1);
                await cart.save();
            }else{
                await cart.save();
            }
            res.status(200).json({success: true, message: "Successfully!",cart})
        } catch (error) {
            res.status(404).json(error);
        }
    }

}

module.exports = cartController;