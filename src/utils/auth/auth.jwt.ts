import { User } from "../../modules/users/model/user.model.js";
import { IAuth } from "./auth.interface";
import jwt from "jsonwebtoken";

export class AuthJWT implements IAuth {
  sign(payload: User): string {
    const token = jwt.sign({ payload }, process.env.JWT_SECRET, {
      subject: payload.id,
      expiresIn: "5m",
    });
    return token;
  }
  verify(token: string, secret: string): string {
    try {
      const tokenIsValid = jwt.verify(token, secret);
      if (typeof tokenIsValid != "string") {
        return tokenIsValid.payload.username;
      }
      return tokenIsValid;
    } catch (err) {
      return null;
    }
  }

  async extractTokenFromHeader(req): Promise<string> {
    if (!req.headers.authorization) {
      return;
    }
    const token = req.headers.authorization.split(" ")[1] || "";
    return token;
  }
}
