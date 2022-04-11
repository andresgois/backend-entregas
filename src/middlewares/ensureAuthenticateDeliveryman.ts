import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticateDeliveryman(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({
      message: "Tokem missing",
    });
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(token, "sd1g8fhg9t5ht2h2nmnmg2h64g") as IPayload;
    request.id_deliveryman = sub;

    console.log(sub);
    return next();
  } catch (error) {
    return response.status(401).json({
      message: "Invalid token",
    });
  }
}
