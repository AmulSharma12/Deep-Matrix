const jwt = require("jsonwebtoken");
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;
const RefreshModel = require("../models/token-model");

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, accessTokenSecret, {
      expiresIn: "1m",
    });

    const refreshToken = jwt.sign(payload, refreshTokenSecret, {
      expiresIn: "1y",
    });

    return { accessToken, refreshToken };
  }

  // storing refresh token into the database
  async storeRefreshToken(token, user) {
    try {
      await RefreshModel.create({ token: token, userId: user });
    } catch (err) {
      console.log("storeRefreshToken() " + err);
    }
  }

  // for verifying accessToken coming from client is valid or not
  async verifyAccessToken(token) {
    return jwt.verify(token, accessTokenSecret);
  }

  // for verifying refreshToken coming from client is valid or not
  async verifyRefreshToken(refreshToken) {
    return jwt.verify(refreshToken, refreshTokenSecret);
  }

  // for checking token is present in the database or not
  async findRefreshToken(userId, refreshToken) {
    return await RefreshModel.findOne({ userId: userId, token: refreshToken });
  }

  // for updating refreshToken
  async updateRefreshToken(userId, refreshToken) {
    return await RefreshModel.updateOne(
      { userId: userId },
      { token: refreshToken }
    );
  }

  // for removing the refresh token from the database
  async removeRefreshToken(refreshToken) {
    return await RefreshModel.deleteOne({ token: refreshToken });
  }
}

module.exports = new TokenService();
