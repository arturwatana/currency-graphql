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
    async extractTokenFromHeader(req) {
        if (!req.headers.authorization) {
            return;
        }
        const token = req.headers.authorization.split(" ")[1] || "";
        return token;
    }
}
