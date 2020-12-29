/* eslint-disable arrow-parens */
const jwt = require('jsonwebtoken');
const { secretKey, options, refreshOptions } = require('../config/secretKey');
const userService = require('../service/userService');

const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

module.exports = {
  sign: async user => {
    const payload = {
      id: user.id,
      name: user.userName,
    };
    const result = {
      accessToken: jwt.sign(payload, secretKey, options),
      refreshToken: jwt.sign(payload, secretKey, refreshOptions),
    };

    await userService.updateRefreshToken(user.id, result.refreshToken);
    return result;
  },
  verify: async token => {
    let decoded;
    try {
      decoded = jwt.verify(token, secretKey);
    } catch (err) {
      if (err.message === 'jwt expired') {
        console.log('expired token');
        return TOKEN_EXPIRED;
      }
      if (err.message === 'invalid token') {
        console.log('invalid token');
        console.log(TOKEN_INVALID);
        return TOKEN_INVALID;
      }
      console.log('invalid token');
      return TOKEN_INVALID;
    }
    return decoded;
  },
  refresh: async refreshToken => {
    try {
      const result = jwt.verify(refreshToken, secretKey);
      if (result.id === undefined) {
        return TOKEN_INVALID;
      }
      const user = await userService.checkUserId(result.id);
      if (refreshToken !== user.refreshToken) {
        console.log('invalid refresh token');
        return TOKEN_INVALID;
      }
      const payload = {
        id: user.id,
        name: user.userName,
      };
      const accessToken = jwt.sign(payload, secretKey, options);
      return accessToken;
    } catch (err) {
      if (err.message === 'jwt expired') {
        console.log('expired token');
        return TOKEN_EXPIRED;
      }
      if (err.message === 'invalid token') {
        console.log('invalid token');
        console.log(TOKEN_INVALID);
        return TOKEN_INVALID;
      }
      console.log('invalid token');
      return TOKEN_INVALID;
    }
  },
};
