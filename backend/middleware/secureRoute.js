import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const secureRoute = async (req, res, next) => {
  try {
    // Check for token in both cookies and Authorization header
    const token = req.cookies.jwt || req.header("Authorization")?.replace("Bearer ", "");
    
    // console.log("🟡 Checking token:", token ? "Token found" : "No token");

    if (!token) {
      // console.log("🔴 Authentication failed: No token provided");
      return res.status(401).json({ 
        success: false, 
        message: "Authentication required. Please login." 
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_TOKEN);
      // console.log("🟢 Token verified successfully");

      const user = await User.findById(decoded.userId)
        .select("-password")
        .lean();

      if (!user) {
        // console.log("🔴 User not found in database");
        return res.status(401).json({ 
          success: false, 
          message: "User no longer exists" 
        });
      }

      // Attach user to request object
      req.user = user;
      // console.log("🟢 User authenticated:", user.email);
      next();

    } catch (jwtError) {
      // console.log("🔴 JWT verification failed:", jwtError.message);
      return res.status(401).json({ 
        success: false, 
        message: "Invalid or expired token" 
      });
    }

  } catch (error) {
    // console.log("🔴 Server error:", error.message);
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
};

export default secureRoute;


