import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../database/prismaClient";

interface IAuthenticateDeliveryman {
  username: string;
  password: string;
}

export class AuthenticateDeliverymanUseCase {
  // username e password
  async execute({ username, password }: IAuthenticateDeliveryman) {
    // Verifica se o Deliveryman esta cadastrado
    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username,
      },
    });

    if (!deliveryman) {
      throw new Error("deliveryman or password invalid");
    }

    // Verifica se a senha corresponde ao username
    const passwordMatch = await compare(password, deliveryman.password);

    if (!passwordMatch) {
      throw new Error("deliveryman or password invalid");
    }

    // Gerar token
    const token = sign({ username }, "sd1g8fhg9t5ht2h2nmnmg2h64g", {
      subject: deliveryman.id,
      expiresIn: "1d",
    });

    return token;
  }
}
