import jwt from "jsonwebtoken";
export class AuthJWT {
    sign(payload) {
        const token = jwt.sign({ payload }, process.env.JWT_SECRET, {
            subject: payload.id,
            expiresIn: "5m",
        });
        return token;
    }
    verify(token, secret) {
        try {
            const tokenIsValid = jwt.verify(token, secret);
            if (typeof tokenIsValid != "string") {
                return tokenIsValid.payload.username;
            }
            return tokenIsValid;
        }
        catch (err) {
            return null;
        }
    }
}
