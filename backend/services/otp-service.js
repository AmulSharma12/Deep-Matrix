const crypto = require("crypto");
const smsSid = process.env.SMS_SID;
const smsAuthToken = process.env.SMS_AUTH_TOKEN;
const twilio = require("twilio")(smsSid, smsAuthToken, {
  lazyLoading: true,
});
const hashService = require('./hash-service');

class OtpService {
  //generateOtp - will generate the otp
  async generateOtp() {
    const otp = crypto.randomInt(1000, 9999);
    return otp;
  }

  // sending the otp through the sms
  async sendBySms(phone, otp) {
    return await twilio.messages.create({
      to: phone,
      from: process.env.SMS_FROM_NUMBER,
      body: `Your deepmatrix OTP is ${otp}`,
    });
  }

  // verify the otp
  verifyOtp(hashedOtp, data) {
    let computedHash = hashService.hashOtp(data);
    return computedHash === hashedOtp;
  }
}

// exporting OtpService as Singelton pattern
module.exports = new OtpService();
