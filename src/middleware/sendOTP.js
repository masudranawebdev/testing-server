const { default: axios } = require('axios');

const SendOTP = async (otp, number) => {
    try {
        const response = await axios.get(
    `https://sms.rapidsms.xyz/request.php?user_id=prithibi&password=5475207&number=${number}&message=Your%20registration%20otp%20is%20${otp}`
);
    if(response?.data?.status == "success"){
        return true;
    }else{
        return false;
    }
    } catch (error) {
        return false;
    }
};

module.exports = {
    SendOTP,
};
