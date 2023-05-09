import jsonwebtoken from "jsonwebtoken";
import config from "@/api/config.js";
import UserModel from "../db/models/UserModel";
import * as yup from "yup"; 

const auth = () => {

  return async (ctx) => {
    const { req, res, next, logger } = ctx;
    console.log("headers authorization : ", req.headers); 
    const jwt = req.headers.authorization.slice(7);

    if (!jwt) {
      return res.status(401).json({ message: "No token provided" });
    }

    const { payload: { user: { id } } } = jsonwebtoken.verify(jwt, config.security.jwt.secret);

    console.log("JWT : ", jwt); 

    try {
      const user = await UserModel.query().findOne({ id });

      if (!user) {
        res.status(401).send({ error: "Unauthorized" });

        return;
      }

      next();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        res.status(422).send({ error: error.errors });

        return;
      }

      logger.error(error);
    }
  };
};

export default auth; 