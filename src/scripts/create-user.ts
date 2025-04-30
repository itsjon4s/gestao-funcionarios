import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const passwordHash = await bcrypt.hash("1234", 10);

  await prisma.user.create({
    data: {
      email: "admin@devscope.com",
      password: passwordHash,
    },
  });

  console.log("Usuário criado!");
}

main();
