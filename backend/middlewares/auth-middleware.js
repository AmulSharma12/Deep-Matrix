const tokenService = require("../services/token-service");

//middleware means after request from the client and before reached to the server
module.exports = async function (req, res, next) {
  try {
    const { accessToken } = req.cookies;
    // console.log(accessToken);

    if (!accessToken) throw new Error();
    const userData = await tokenService.verifyAccessToken(accessToken);
    // console.log(userData);
    if (!userData) throw new Error();
    req.user = userData;
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized access" });
  }
};
