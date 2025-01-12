import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

async function checkJwt(request, response, next) {
  try {
    const token = request.header("Authorization")?.split(" ")?.[1];
    console.log(token);
    const decoded = jwt.verify(token, process.env.secret);

    response.locals.user = decoded;
    return next();
  } catch (error) {
    return response.status(403).json("User not authorized");
  }
}

export default checkJwt;
