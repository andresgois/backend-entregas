import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../database/prismaClient";

interface IAuthenticateUser {
  username: string;
  password: string;
}

export class AuthenticateUserUseCase {
  // username e password
  async execute({ username, password }: IAuthenticateUser) {
    // Verifica se o username é cadastrado
    const client = await prisma.clients.findFirst({
      where: {
        username,
      },
    });

    if (!client) {
      throw new Error("Client or password invalid");
    }

    // Verifica se a senha corresponde ao username
    const passwordMatch = await compare(password, client.password);

    if (!passwordMatch) {
      throw new Error("Client or password invalid");
    }

    // Gerar token
    const token = sign({ username }, "sd1g8fhg9t5ht2h2g2h64g", {
      subject: client.id,
      expiresIn: "1d",
    });

    return token;
  }
}
