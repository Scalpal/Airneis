import jsonwebtoken from "jsonwebtoken";
import config from "@/api/config.js";
import UserModel from "../db/models/UserModel";
import * as yup from "yup";

const auth = () => {
  return async (ctx) => {
    const { req, res, next, logger, locals } = ctx;


    if (!req.headers.authorization) {
      res.status(401).json({ message: "No token provided" });

      return;
    }

    const jwt = req.headers.authorization.slice(7);

    if (!jwt) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decodedToken = jsonwebtoken.decode(jwt);
    const isTokenExpired = Date.now() >= decodedToken.exp * 1000;

    if (isTokenExpired) {
      res.status(500).send({ error: "Token expired" }); 

      return;
    }

    const { payload: { user: { id } } } = jsonwebtoken.verify(jwt, config.security.jwt.secret);
    locals.userId = id; 

    try {
      const user = await UserModel.query().findOne({ id });

      if (!user) {
        res.status(401).json({ error: "Unauthorized" });

        return;
      }

      locals.user = user;

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
