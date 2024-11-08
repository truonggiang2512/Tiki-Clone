import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken"
import { env } from "~/config/environment";
export const authenticateJWT = (req, res, next) => {
  /* req.header('Authorization') gets the value of the Authorization header, which usually contains something like: "Bearer <token>".
  .replace('Bearer ', '') removes the "Bearer " prefix, leaving only the token itself.
  If the header is not present, ?. (optional chaining) prevents an error by returning undefined for token.
  */
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(StatusCodes.FORBIDDEN).json({ message: 'No token provided' });
  }

  jwt.verify(token, env.SECRET_JWT_KEY, (err, user) => {
    if (err) {
      return res.status(StatusCodes.FORBIDDEN).json({ message: 'Invalid token' });
    }
    req.user = user; // Attach the user info to the request object
    next();
  });
}
// Middleware to authorize only admins
export const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(StatusCodes.FORBIDDEN).json({ message: 'Admin access required' });
  }
  next();
};