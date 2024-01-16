// const jwt = require("jsonwebtoken");
// const { promisify } = require("util");
// const dotenv = require("dotenv").config();
/**
 * 1. check if token exists
 * 2. if not token send res
 * 3. decode the token
 * 4. if valid next
 */

// module.exports = async (req, res, next) => {
//   try {
//     console.log(req.headers?.authorization);
    // const token = req.headers?.authorization?.split(" ")?.[1];
    // console.log(token);

    // if(!token){
    //   return res.status(401).json({
    //     status: "fail",
    //     error: "You are not logged in"
    //   });
    // }
    

    // const decoded = await promisify(jwt.verify)(token, process.env.ACCESS_TOKEN);

    // // const user = User.findOne({ email: decoded.email })

    // req.user = decoded;

    // next();


//   } catch (error) {
//     res.status(403).json({
//       status: "fail",
//       error: "Invalid token"
//     });
//   }
// };

const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { checkAUserExitsForVerify } = require("./check.user.role.exist.middleware");
const ApiError = require("../errors/ApiError");
const dotenv = require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")?.[1];

    if (!token) {
      throw new ApiError(400, 'Need Log In !')
    }

    const decoded = await promisify(jwt.verify)(token, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hem11bEBnbWFpbC5jb20iLCJpYXQiOjE2OTQ0MzExOTF9.xtLPsJrvJ0Gtr4rsnHh1kok51_pU10_hYLilZyBiRAM");
    // const decoded = await promisify(jwt.verify)(token, process.env.ACCESS_TOKEN);

    const email = decoded?.email;

    const verifyUser = await checkAUserExitsForVerify(email)
    if(verifyUser?.email == email && verifyUser?.role == 'admin'){
        req.user = decoded;
        next();
    }else{
        throw new ApiError(400, 'Invalid User !')
    }
    
  } catch (error) {
    next(error)
  }
};
