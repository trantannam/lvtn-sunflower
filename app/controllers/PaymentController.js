const moment = require('moment')
const crypto = require('crypto');
const {vnp_TmnCode,vnp_HashSecret, vnp_Url, vnp_ReturnUrl} = require('./../../config/db/default.json');
const querystring = require('qs')

//need total, bankcode, desc

const paymentController ={ 

    sortObject: (obj) => {
        let sorted = {};
        let str = [];
        let key;
        for (key in obj){
            if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
            }
        }
        str.sort();
        for (key = 0; key < str.length; key++) {
            sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
        }
        return sorted;
    },

    vnpay: (req, res) => {
        var ipAddr = req.socket.remoteAddress;
        var tmnCode = vnp_TmnCode;
        var secretKey = vnp_HashSecret;
        var vnpUrl = vnp_Url;
        var returnUrl = vnp_ReturnUrl;
    
        var date = new Date();
        var dueDate = date.setMinutes(date.getMinutes() + 15)
        var createDate = moment(date).format('YYYYMMDDHHmmss');
        var expireDate = moment(dueDate).format('YYYYMMDDHHmmss');
        var orderId = date.getTime().toString() + Math.floor(Math.random()*100);
        var amount = req.body.total; // tong tien
        var bankCode = req.body.bankCode; //NCB
    
        var orderInfo = req.body.description; // noi dung thanh toan
        var orderType = 'billpayment';
        var locale = 'vn';
        var currCode = 'VND';
        var vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        // vnp_Params['vnp_Merchant'] = ''
        vnp_Params['vnp_Locale'] = locale;
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = orderInfo;
        vnp_Params['vnp_OrderType'] = orderType;
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_ReturnUrl'] = returnUrl;
        vnp_Params['vnp_IpAddr'] = ipAddr;
        vnp_Params['vnp_CreateDate'] = createDate;
        vnp_Params['vnp_ExpireDate'] = expireDate;
        vnp_Params['vnp_BankCode'] = bankCode || 'NCB';
    
        vnp_Params = paymentController.sortObject(vnp_Params);
    
        var signData = querystring.stringify(vnp_Params, { encode: false });
        var hmac = crypto.createHmac("sha512", secretKey);
        var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
        console.log(vnpUrl);
        res.send({ data: vnpUrl, success: true, tranCode: orderId })
    }
}

module.exports = paymentController;