import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const generateTemporaryToken = function () {
  const unHashedToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(unHashedToken)
    .digest("hex");
  const tokenExpiry = Date.now() + 24 * 60 * 60 * 1000;

  return {
    unHashedToken,
    hashedToken,
    tokenExpiry,
  };
};

const generateAccessToken = function (user) {
  return jwt.sign(
    {
      id:user.id,
      username:user.username,
      email:user.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn:process.env.ACCESS_TOKEN_EXPIRY}
  )
}

const generateRefreshToken = function (user) {
  return jwt.sign(
    {
      id:user.id,
      username:user.username,
      email:user.email,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {expiresIn:process.env.REFRESH_TOKEN_EXPIRY}
  )
}

export { generateTemporaryToken, generateAccessToken, generateRefreshToken };
