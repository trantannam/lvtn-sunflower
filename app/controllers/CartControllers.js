const Cart = require("../models/Cart");

const cartController = {

    //get cart
    getCart: async (req, res)=>{
        try {
            const listCart = await Cart.find(req.body);
            res.status(200).json({success: true, message: "Successfully!", listCart});
        } catch (error) {
            res.status(404).json(error);
        }
    },

    //Create and add product to cart
    createCart: async (req, res) => {
        try {
            const item = await new Cart(req.body);
            const cart = await item.save();
            res.status(200).json({ message: "Add to cart successfully", cart });
        } catch (error) {
            res.status(404).json(error);
        }
    },

    //Add to cart
    addToCart: async (req, res)=>{
        try {
            const cart = await Cart.findById(req.body._id);
            const temp = cart.product;
            temp.push((req.body.product));
            // const data = Object.assign(cart.product, req.body.product);
            console.log("cart", req.body.product);
            await cart.updateOne(cart);
            res.status(200).json({data:data,cart});
        } catch (error) {
            res.status(404).json(error);
        }
    },

    //Update product in cart (update quantity)
    updateCart: async (req, res) => {

        try {
            const cart = await Cart.findById(req.body._id);
            // const cart = new Cart;
            // const newCart = Object.assign(cart, req.body);
            await cart.updateOne(req.body);
            res.status(200).json({ message: "Update cart successfully", cart });
        } catch (error) {
            res.status(404).json(error);
        }
    },

    //Delete product in cart
    deleteCart: async (req, res) => {
        try {
            const cart = await Cart.findById(req.body._id);
            await cart.updateOne(req.body);
            res.status(200).json(cart)
        } catch (error) {
            res.status(404).json(error);
        }
    }

}

module.exports = cartController;