import jwt from "jsonwebtoken";
import { secret } from "../config.js";

async function checkJwt(request, response, next) {
  try {
    const token = request.header("Authorization")?.split(" ")?.[1];
    const decoded = jwt.verify(token, secret);

    response.locals.user = decoded;
    return next();
  } catch (error) {
    return response.status(403).json("User not authorized");
  }
}

export default checkJwt;
