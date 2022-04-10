import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export async function EnsureAuthenticateClient(
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

  // Bearer 9984662123311
  // [0] - Bearer
  // [1] - 9984662123311
  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(token, "sd1g8fhg9t5ht2h2g2h64g") as IPayload;
    request.id_client = sub;

    console.log(sub);
    return next();
  } catch (error) {
    return response.status(401).json({
      message: "Invalid token",
    });
  }
}
