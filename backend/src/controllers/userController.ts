import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async (req: any, res: any) => {
  const { id, name, email } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    const newUser = await prisma.user.create({
      data: {
        id,
        name,
        email,
      },
    });
    console.log("User created");
    res.json(newUser);
  } else {
    console.log("User already exists");
    res.json(user);
  }
};
