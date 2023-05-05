const AddressDelivery = require("../models/DeliveryAddress");


const cartController = {

    //add new delivery address
    addAddress: async (req, res)=>{
        try {
            const findAdd = await AddressDelivery.findOne({customerID: req.body.customerID});
            if(findAdd===null){
                const data = new AddressDelivery(req.body);
                const address = await data.save();
                res.status(200).json({message: "successfully", success: true, address});
            }else{
                    findAdd.division.push({
                    province: req.body.division.province,
                    district: req.body.division.district,
                    ward: req.body.division.ward,
                    describe: req.body.division.describe
                })
                const add = await findAdd.save()
                res.status(200).json({message: "successfully", success: true, add});
            }
        } catch (error) {
            res.status(404).json(error);
        }
    },
    //get address by user ID
    getAddress: async (req, res)=>{
        // console.log("body", req.body.customerID)
        try {
            const data = await AddressDelivery.findOne({customerID: req.body.customerID});
            console.log("data",data)
            res.status(200).json({message: "successfully",success:true, data});
        } catch (error) {
            res.status(404).json(error);
        }
    }

}

module.exports = cartController;