const crypto = require("crypto");

class HashService {
  //for hashing otp
  hashOtp(data) {
    // hash algorithim and secret key
    return crypto
      .createHmac("sha256", process.env.HASH_SECRET)
      .update(data )
      .digest("hex");
  }
}

module.exports = new HashService();
