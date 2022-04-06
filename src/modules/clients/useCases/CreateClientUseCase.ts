import { hash } from "bcrypt";
import { prisma } from "../../../database/prismaClient";

interface ICreateClient {
  username: string;
  password: string;
}

class CreateClientUseCase {
  async execute({ username, password }: ICreateClient) {
    // Validar se o usuário existe
    const clientExists = await prisma.clients.findFirst({
      where: {
        username: {
          mode: "insensitive",
        },
      },
    });

    if (clientExists) {
      throw new Error("Client Already exists!");
    }
    // Criptografar a senha
    const hashPassword = await hash(password, 10);
    // Salva o Cliente
    const client = await prisma.clients.create({
      data: {
        username,
        password: hashPassword,
      },
    });

    return client;
  }
}

export { CreateClientUseCase };
