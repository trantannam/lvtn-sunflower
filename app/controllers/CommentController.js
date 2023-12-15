const Comment = require('../models/Comment');

const commentController = {
    postComment: async (req, res) => {
        try {
            const comment = new Comment(req.body);
            await comment.save();
            res.status(200).json({ success: true, message: "Successfully!", comment });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getCommentByProduct: async (req, res) => {
        try {
            const allComment = await Comment.find({ product: req.params.id }).populate("product").populate("customer");
            if (allComment) {
                return res.status(200).json({ success: true, message: "Successfully!", allComment });
            }
            return res.status(404).json();
        } catch (error) {
            return res.status(403).json(error.message);
        }
    },
    getCommentByCustomer: async (req, res) => {
        try {
            const allComment = await Comment.find({ customer: req.body.customer }).populate("product").populate("customer");
            if (allComment) {
                return res.status(200).json({ success: true, message: "Successfully!", allComment });
            }
            return res.status(500).json(error);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

module.exports = commentController;