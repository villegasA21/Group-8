import jwt from "jsonwebtoken";

export function authenticateToken(
    req,
    res,
    next
) {

    const authorization =
        req.headers.authorization;


    if (
        !authorization ||
        !authorization.startsWith("Bearer ")
    ) {

        return res.status(401).json({

            success: false,

            message:
                "Please login first."

        });

    }


    const token =
        authorization.split(" ")[1];


    try {

        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );


        req.user = decoded;

        next();

    } catch (error) {

        return res.status(403).json({

            success: false,

            message:
                "Session expired."

        });

    }
}