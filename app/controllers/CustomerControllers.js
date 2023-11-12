const User = require("../models/Customer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let refreshTokens = [];
const authController = {

    //generate access token
    generateAccessToken: (user) => {
        return jwt.sign({
            id: user.id,
        },
            "custormerlogintoken",
            { expiresIn: "72h" }
        );
    },

    //generate Refresh token
    generateRefreshToken: (user) => {
        return jwt.sign({
            id: user.id,
        },
            "custormerrefreshtoken",
            { expiresIn: "30d" }
        );
    },

    //get customer by id
    getInfo: async(req, res)=>{
        try {
            const user = await User.findById(req.params.id);
            if(user){
                return res.status(200).json({
                    success: true,
                    message: "Successfully!",
                    user
                })
            }else{
                return res.status(404).json({
                    success: false,
                    message: "User failed!"
                })
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    //customer register
    register: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            //create new user
            const createUser = await new User({
                customer_name: req.body.customer_name,
                phone_number: req.body.phone_number,
                gender: req.body.gender,
                password: hashed,
                login_name: req.body.login_name,
            });

            //save db
            const user = await createUser.save();
            if (user) {
                return res.status(200).json({ message: "Successfully", success: true, data: user });
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    login: async (req, res) => {
        try {
            const user = await User.findOne({
                $or: [
                    { phone_number: req.body.phone_number },
                    { password: req.body.password },
                ]
            });

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "Account not found!"
                })
            }

            const validPassword = await bcrypt.compare(req.body.password, user.password);

            if (!validPassword) {
                return res.status(404).json({
                    success: false,
                    message: "Password failed!"
                })
            }

            if (user && validPassword) {
                const accessToken = authController.generateAccessToken(user);
                const refreshToken = authController.generateRefreshToken(user);
                console.log(user)
                const { password, ...others } = user._doc;
                refreshTokens.push(refreshToken);
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict",
                });
                return res.status(200).json({
                    success: true,
                    message: "Successfully!",
                    ...others,
                    accessToken,
                })
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    //get all customer
    getAllCustomer: async (req, res) => {

        try {
            const user = await User.find();
            res.status(200).json({
                success: true,
                message: "Successfully!",
                user
            });
        } catch (error) {
            return res.status(500).json(error);
        }

    },

    //add product to list_loveproducts
    addListLoveProducts: async (req, res) => {
        try {
            const add = await User.findById(req.body.id);
            if (add) {
                if (!add.list_loveproducts.includes(req.body.product)) {
                    await add.updateOne({ _id: req.body.id, $push: { list_loveproducts: req.body.product } })

                    res.status(200).json({
                        success: true,
                        message: "Successfully!",
                        list_loveproducts: add
                    });
                } else {
                    return res.status(200).json({
                        success: false,
                        message: "san pham da ton tai!",
                    })
                }
            } else {
                return res.status(404).json({
                    success: false,
                    message: "User failed!"
                })
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    //remove product to list_loveproducts
    removeListLoveProducts: async (req, res) => {
        try {
            const add = await User.findById(req.body.id);
            if (add) {
                if (add.list_loveproducts.includes(req.body.product)) {
                    await add.updateOne({ _id: req.body.id, $pull: { list_loveproducts: req.body.product } })

                    res.status(200).json({
                        success: true,
                        message: "Successfully!",
                        list_loveproducts: add
                    });
                } else {
                    return res.status(200).json({
                        success: false,
                        message: "Chua thich san pham nay!",
                    })
                }
            } else {
                return res.status(404).json({
                    success: false,
                    message: "User failed!"
                })
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    //get list product
    getListLoveProducts: async (req, res) => {
        try {
            const product = await User.findById(req.params.id)
            console.log("product",product)
            if(product){
                return res.status(200).json({
                    success: true,
                    message: "Successfully!",
                    list_loveproducts: product.list_loveproducts
                })
            }else{
                return res.status(404).json({
                    success: false,
                    message: "User failed!"
                })
            }
        } catch (error) {
            return res.status(500).json(error);
        }

    },

    //refresh token
    requestRefreshToken: async (req, res) => {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(401).json({ message: " You're not authenticated" });
        if (!refreshTokens.includes(refreshToken)) {
            res.status(403).json({ message: "refresh token is not valid" })
        }
        jwt.verify(refreshToken, "custormerrefreshtoken", (err, user) => {
            if (err) {
                console.log(err);
            }
            refreshTokens = refreshTokens.filter((token) => token !== refreshToken)
            const newAccessToken = authController.generateAccessToken(user);
            const newRefreshToken = authController.generateRefreshToken(user);
            refreshTokens.push(newRefreshToken);
            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            });
            res.status(200).json({
                success: true,
                message: "Successfully!",
                accessToken: newAccessToken,
            })
        })
    },
    logout: (req, res) => {
        res.clearCookie("refreshToken");
        refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken);
        res.status(200).json({ message: "Logged out!" })
    }
}

module.exports = authController;