const otpService = require("../services/otp-service");
const hashService = require("../services/hash-service");
const userService = require("../services/user-service");
const tokenService = require("../services/token-service");
const UserDto = require("../dtos/user-dto");

// creating AuthController
class AuthController {
  //------------------sendOtp function
  async sendOtp(req, res) {
    //logic
    const { phone } = req.body;

    if (!phone) {
      res.status(400).json({ message: "Phone is required field!" });
    }

    // generating otp
    const otp = await otpService.generateOtp();

    // hashing otp in specific format
    const timeDuration = 1000 * 60 * 2; // 2 minutes duration
    const expireTime = Date.now() + timeDuration;
    const data = `${phone}.${otp}.${expireTime}`;
    // console.log(data);
    const hash = hashService.hashOtp(data);
    // console.log(hash);

    // sending hash in the mobile - using twilio
    try {
      // await otpService.sendBySms(phone, otp);

      res.json({
        hash: `${hash}.${expireTime}`,
        phone,
        otp,
      });
    } catch (err) {
      console.log("error in sending sms..." + err);
      res.status(500).json({ message: "message failed" });
    }
  }

  //----------------verify otp function
  async verifyOtp(req, res) {
    // Logic
    const { phone, otp, hash } = req.body;

    //if any of them is not get then its error case
    if (!phone || !otp || !hash) {
      res.status(400).json({ message: "All fields are required" });
    }

    // if data is right then split it by dot left is hash and right is expire time
    const [hashOtp, expires] = hash.split(".");
    if (Date.now() > +expires) {
      res.status(400).json({ message: "OTP expired" });
    }

    // original data
    const data = `${phone}.${otp}.${expires}`;
    const isValid = otpService.verifyOtp(hashOtp, data);
    if (!isValid) {
      res.status(400).json({ message: "Wrong OTP" });
    }

    //if right otp then create user
    let user;

    //before going further we have to create database as accessToken requires userData
    // npm install moongose
    try {
      //if key and value is same then we can pass only one time
      user = await userService.findUser({ phone });
      if (!user) {
        user = await userService.createUser({ phone });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "db error" });
    }

    //generating JWT Token
    const { accessToken, refreshToken } = tokenService.generateTokens({
      _id: user._id,
      activated: false,
    });

    //storing refresh token to database
    console.log(user._id);
    await tokenService.storeRefreshToken(refreshToken, user._id);

    //accessToken  and refreshtoken storing in cookie
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    const userDto = new UserDto(user);
    res.json({ auth: true, user: userDto });
  }

  //-----------------refresh() - for generating new access token if expires using refresh token
  async refresh(req, res) {
    // 1. get the refresh token from the cookie
    const { refreshToken: refreshTokenFromCookie } = req.cookies;

    // 2. refreshTokenFromCookie is valid or not
    let userData;
    try {
      userData = await tokenService.verifyRefreshToken(refreshTokenFromCookie);
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // 3. check if the token is in db
    try {
      const token = await tokenService.findRefreshToken(
        userData._id,
        refreshTokenFromCookie
      );

      if (!token) {
        console.log("token not found in DB");
        return res.status(401).json({ message: "Invalid token" });
      }
    } catch (err) {
      return res.status(501).json({ message: "DB error" });
    }
    console.log("checked in DB");
    // 4. check if it is authorized user or not
    const user = await userService.findUser({
      _id: userData._id,
    });

    if (!user) {
      console.log("user not found");
      return res.status(404).json({ message: "user not found!" });
    }
    console.log("user authorize or not");
    // 5. generate new token
    const { refreshToken, accessToken } = tokenService.generateTokens({
      _id: userData._id,
    });
    console.log("new tokens");
    // 6. updating refreshToken
    try {
      await tokenService.updateRefreshToken(userData._id, refreshToken);
    } catch (err) {
      return res.status(500).json({ message: "DB error!" });
    }
    console.log("not worked");
    // 7. put in cookie and sending response
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    const userDto = new UserDto(user);
    res.json({ auth: true, user: userDto });
  }

  //-------------------------- logout() function
  async logout(req, res) {
    // 1.first we need to delete the refresh token from the database
    const { refreshToken } = req.cookies;
    try {
      await tokenService.removeRefreshToken(refreshToken);
    } catch (err) {
      console.log("refreshToken not removed");
    }
    // 2.deleting the cookies
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    res.json({ user: null, isAuth: false });
  }
}

// exporting object of AuthController in javascript
// singelton pattern - whenever we require the class we get the same object
module.exports = new AuthController();
