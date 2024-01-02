
const bcrypt = require("bcryptjs");
const ApiError = require("../../errors/ApiError");
const sendResponse = require("../../shared/send.response");
const httpStatus = require("http-status");
const { checkAUserExits, postRegUserServices } = require("../services/user.reg.services");
const saltRounds = 10;

// registration a user
exports.postRegUser = async (req, res, next) => {
    try {
        const data = req.body;
        const inserted = await checkAUserExits(data?.email);
        if (inserted) {
            throw new ApiError(400, 'Previously Added !')
        }
        const otp = Math.floor(1000 + Math.random() * 9000);
        bcrypt.hash(data?.password, saltRounds, async function (err, hash) {
            const newUser = {
                email: data.email,
                password: hash,
                phone: data.phone,
                otp: otp,
                name: data?.name,
                customer: "customer"
            }
            try {
                const result = await postRegUserServices(newUser);
                sendResponse(res, {
                    statusCode: httpStatus.OK,
                    success: true,
                    message: 'User Added successfully !',
                    data: result,
                });
            } catch (error) {
                next(error);
            }

        });
    } catch (error) {
        next(error)
    }
}