import jwt from "jsonwebtoken";
export class AuthJWT {
    sign(payload) {
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
    verify(token, secret) {
        try {
            const tokenIsValid = jwt.verify(token, secret);
            if (typeof tokenIsValid != "string") {
                return tokenIsValid.payloadMapper.email;
            }
            return tokenIsValid;
        }
        catch (err) {
            return null;
        }
    }
    async extractTokenFromHeader(token) {
        if (!token) {
            return;
        }
        const tokenWithoutBearer = token.split(" ")[1] || "";
        return tokenWithoutBearer;
    }
}
