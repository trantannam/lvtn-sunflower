const Staff = require('../models/staff.js');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let refreshTokens = [];
/// lay image
const multer = require('multer');
// vào images
// const upload = multer({ dest: './images/users/' });
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../img/avatars/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    //reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter,
});

const StaffControllers = {
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

    getList: async (req, res) => {
        try {
            const users = await Staff.find({});
            if (!users) {
                return res.status(404).send({ success: false, message: "Không tìm thấy nhân viên"});
            }
            res.send({ success: true, data: users });
        } catch (e) {
            return res.status(404).send({ success: false, message: "Server error"});
        }
    },
    sigin: async (req, res) => {
        try {
            const user = await Staff.findOne({ phone: req.body.phone });
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
                const accessToken = StaffControllers.generateAccessToken(user);
                const refreshToken = StaffControllers.generateRefreshToken(user);
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
            return res.status(500).json(error.message);
        }
    },
    createStaff: async (req, res) => {
        const {
            name,
            email,
            phone,
            password,
            address
        } = req.body
        
        try {
            const exists = await Staff.findOne({ phone })
            if (!exists) {
                const salt = await bcrypt.genSalt(10);
                const hashed = await bcrypt.hash(password, salt);

                //create new user
                const user = new Staff({
                    name,
                    email,
                    phone,
                    password: hashed,
                    address
                });
                //save db
                const createdStaff = await user.save();
                if (createdStaff) {
                    return res.send({ data: createdStaff, success: true });
                }
            }
            return res.send({ error: 'Số điện thoại đã tồn tại', success: false });
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    updateStaff: async (req, res) => {
        upload.single('image')
        try {
            const {
                name,
                email,
                phone,
                address
            } = req.body
            const exists = await Staff.findOne({ email })
            if (!exists) {
                return res.send({ data: 'Không tìm thấy người dùng', success: false });
            }
            exists.name = name,
            exists.email = email,
            exists.image = req.file?.path || exists.image,
            exists.phone = phone ,
            exists.address = address
        
            const createdStaff = await exists.save();
            if (createdStaff) {
                return res.send({ data: createdStaff, success: true });
            }
        } catch (err) {
            return res.send({ data: 'Server error ', success: false });
        }
    },
    getDetailStaff: async (req, res) => {
        const user = await Staff.findById(req.params.id);
        if (user) {
            res.send({ data: user, success: true });
        }
        else {
            res.status(404).send({ success: false, message: 'Staff Not Found' });
        }
    },
    deleteStaff: async (req, res) => {
        const { id } = req.params;
        try {
            if (!id) {
                return res.status('404').send({ success: false, message: 'Không thể kết nối máy chủ', error: err });
            }
            const user = Staff.findOne({ _id: id })
            if (!user) {
                return res.status('404').send({ success: false, message: 'Không tìm thấy user' });
            }
            await user.deleteOne()
            return res.send({ success: true, message: 'Xóa người dùng thành công.'})
        } catch (err) {
            res.status('404').send({ success: false, message: 'Không thể kết nối máy chủ', error: err });
        }
    }

}

module.exports = StaffControllers;
