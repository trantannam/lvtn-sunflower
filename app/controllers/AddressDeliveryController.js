const AddressDelivery = require("../models/DeliveryAddress");

const cartController = {

    //add new delivery address
    addAddress: async (req, res)=>{
        try {
            const data = new AddressDelivery(req.body);
            const address = await data.save();
            res.status(200).json({message: "successfully", address});
        } catch (error) {
            res.status(404).json(error);
        }
    }

}

module.exports = cartController;