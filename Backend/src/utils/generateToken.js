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
export { generateTemporaryToken };
