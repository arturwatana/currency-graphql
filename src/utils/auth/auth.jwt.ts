import { User } from "../../modules/users/model/user.model.js";
import { IAuth } from "./auth.interface";
import jwt from "jsonwebtoken";

export class AuthJWT implements IAuth {
  sign(payload: User): string {
    const payloadMapper = {
      fullName: payload.fullName,
      email: payload.email,
      id: payload.id,
    };
    const token = jwt.sign({ payloadMapper }, process.env.JWT_SECRET, {
      subject: payloadMapper.id,
      expiresIn: "60m",
    });
    return token;
  }
  verify(token: string, secret: string): string {
    try {
      const tokenIsValid = jwt.verify(token, secret);
      if (typeof tokenIsValid != "string") {
        return tokenIsValid.payloadMapper.email;
      }
      return tokenIsValid;
    } catch (err) {
      return null;
    }
  }

  async extractTokenFromHeader(token: string): Promise<string> {
    if (!token) {
      return;
    }
    const tokenWithoutBearer = token.split(" ")[1] || "";
    return tokenWithoutBearer;
  }
}
