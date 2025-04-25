import jwt from "jsonwebtoken";

export const isLoggedIn = async (req, res, next) => {
  try {
    console.log("=== Auth Middleware Debug ====");
    console.log("Cookies :", req.cookies);
    console.log("Headers:", {
      cookie: req.headers.cookie,
      authorization: req.headers.authorization,
    });

    let token = req.cookies?.accessToken;
    if (!token && req.headers.authorization) {
        token = req.headers.authorization.replace("Bearer", "");
      console.log("No Token");
    }

    console.log("Token found : ", token ? "Yes" : "No");
    if (!token) {
      console.log("No Token");
      return res.status(401).json({
        success: false,
        message: "Authentication failed!",
      });
    }
    try {
        const decoded = await jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        console.log("token verified successfully!");
        console.log("decode data : ",decoded);
        req.user = decoded;
        next()
      } catch (error) {
        console.log("Token verified error :",error.message);
        return res.status(500).json({
          success: false,
          message: "oken verified error",
          error: error.message,
        })
      }
  } catch (error) {
    console.log("Auth middleware failure!");
    return res.status(500).json({
      success: false,
      message: "Failed to authenticate token.",
      error: error.message,
    })
  }
};
