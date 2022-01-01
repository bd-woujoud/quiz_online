const jwt = require("jsonwebtoken"); 


// role : verify if user is authenticated or not with the jwt token provided by the user in the http request header

function isauth (req, res, next)  {
  const token = req.cookies.access_token

  // Check for token
 
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Add user from payload
    req.user = decoded;

    next();
  } catch (e) {
    res.status(400).json({ msg: "Token is not valid" });
  }
};

module.exports = isauth