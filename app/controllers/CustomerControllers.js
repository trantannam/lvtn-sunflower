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

    //customer register
    register: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            //create new user
            const createUser = await new User({
                customername: req.body.customername,
                phonenumber: req.body.phonenumber,
                password: hashed,
                loginname: req.body.loginname,
            });

            //save db
            const user = await createUser.save();
            res.status(200).json({message: "Successfully", success: true,user});
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    login: async (req, res) => {
        try {
            const user = await User.findOne({ phonenumber: req.body.phonenumber });
            // res.json(req.body)

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "account not found!"
                })
            }

            const validPasswork = await bcrypt.compare(req.body.password, user.password);

            if (!validPasswork) {
                return res.status(404).json({
                    success: false,
                    message: "Password failed!"
                })
            }

            if (user && validPasswork) {
                const accessToken = authController.generateAccessToken(user);
                const refreshToken = authController.generateRefreshToken(user);
                const { password, ...others } = user._doc;
                refreshTokens.push(refreshToken);
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict",
                });
                res.status(200).json({
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

    //refresh token
    requestRefreshToken: async (req, res) => {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(401).json({ message: " You're not authenticated" });
        if(!refreshTokens.includes(refreshToken)){
            res.status(403).json({message: "refresh token is not valid"})
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
        res.status(200).json({message: "Logged out!"})
    }
}

module.exports = authController;