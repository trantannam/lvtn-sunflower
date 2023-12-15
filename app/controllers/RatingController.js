const Rating = require('../models/Evaluate');

const ratingController = {
    postRating: async (req, res) => {
        try {
            const rating = new Rating(req.body);
            await rating.save();
            res.status(200).json({ success: true, message: "Successfully!", rating });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getRatingByProduct: async (req, res) => {
        try {
            const rating = await Rating.find({ product: req.params.id }).populate("customer").populate("product");
            if (rating) {
                return res.status(200).json({ success: true, message: "Successfully!", rating });
            }
            return res.status(404).json();
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },
    getRatingByCustomer: async (req, res) => {
        try {
            const rating = await Rating.find({ customer: req.params.id })//.populate("product").populate("customer");
            if (rating) {
                return res.status(200).json({ success: true, message: "Successfully!", rating });
            }
            return res.status(500).json(error);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

module.exports = ratingController;