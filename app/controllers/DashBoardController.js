const mongoose = require('mongoose');
const User = require("../models/Customer");
const PurchaseOrder = require('../models/PurchaseOrder');
const Product = require('../models/Product');
const dayjs = require('dayjs');


const DashBoardController = {

    revenue: (arr) => {
        let total = 0;
        arr.map((item) => {
            if (item.paymentStatus === "paid") {
                item.products.map(product => {
                    total += product.price * product.quantity;
                })
            }
        })
        return total;
    },

    purchasecount: (arr) => {
        let count = 0;
        arr.map(item => {
            if (item.paymentStatus === "paid" && item.deliveryStatus === "delivered") {
                count = count;
            } else count++;
        })
        return count;
    },

    summary: async (req, res) => {
        try {
            const user = await User.find();
            const purchaseOrder = await PurchaseOrder.find();
            const product = await Product.find();
            let revenue = DashBoardController.revenue(purchaseOrder);
            return res.status(200).json({
                success: true,
                massage: "successfully",
                summary: {
                    user: user.length,
                    product: product.length,
                    revenue: revenue,
                    purchase: DashBoardController.purchasecount(purchaseOrder)
                }
            })
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    chart: async (req, res)=>{
        const { step, dateStar, dateEnd } = req.body;
        let end = dateStar
        let branches = [];
        do {
            let start = end;
            switch (step) {
                case 'day':
                    end = dayjs(end).endOf('day');
                    break;
                case 'week':
                    end = dayjs(end).endOf('week').endOf('day');
                    break;
                case 'month':
                    end = dayjs(end).endOf('month').endOf('day');
                    break;
                case 'year':
                    end = dayjs(end).endOf('year').endOf('day');
                    break;
                default:
                    return res.status(502).send('ASD', 422);
            }
            if (end > dayjs(dateEnd)) {
                end = dateEnd;
            }
            const groupKey = dayjs(start).format()
            branches.push({
                'case': {
                    $lte: ['$createdAt', new Date(dayjs(end).valueOf())]
                }, 'then': groupKey
            })
            switch (step) {
                case 'day':
                    end = dayjs(end).add(1, 'day').startOf('day');
                    break;
                case 'week':
                    end = dayjs(end).add(7, 'day').startOf('day');
                    break;
                case 'month':
                    end = dayjs(end).add(28, 'day').startOf('month').startOf('day');
                    break;
                case 'year':
                    end = dayjs(end).add(365, 'day').startOf('year').startOf('day');
                    break;
                default:
                    return res.status(422).send('ASD', 422);
            }
        } while (end <= dayjs(dateEnd));
        const orderAgg = await PurchaseOrder.aggregate([
            {
                $match: {
                    'paymentStatus': "paid"
                }
            },
            {
                $group: {
                    '_id': {
                        $switch: {
                            'branches': branches,
                            'default': ''
                        }
                    },
                    'total_sell': { $sum: '$totalEstimate' }
                }
            },
            { $sort: { '_id': 1 } }
        ])
        const data = [];
        Promise.all(orderAgg.map(item => {
            data.push({
                name: dayjs(item._id).format('DD/MM/YYYY'),
                total: item.total_sell
            })
        }))
        return res.send({ data, success: true })
    }
}

module.exports = DashBoardController;