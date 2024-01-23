const { default: axios } = require("axios");

const SendForgetPasswordLink = async (phone) => {
    try {
        const resetLink = 'http://localhost:3000/reset-password'
        const response = await axios.get(
    `https://sms.rapidsms.xyz/request.php?user_id=prithibi&password=5475207&number=${phone}&message=Your%20reset%20password%20link%20is%20${resetLink}`
);
    if(response?.data?.status == "success"){
        return true;
    }else{
        return false;
    }
    } catch (error) {
        return error;
    }
};

module.exports = {
    SendForgetPasswordLink,
};