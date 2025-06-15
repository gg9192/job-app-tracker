import prisma from "@/lib/prisma";
import { userSchema } from "@/lib/validators/user";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";

interface UserInput {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type NewUser = Omit<UserInput, "confirmPassword">;

export async function createUser(data: UserInput) {
  const parsed = userSchema.parse(data);
  const { confirmPassword, ...userData } = parsed as UserInput;

  const hash = await bcrypt.hash(userData.password, 10);
  const newUser: NewUser = { ...userData, password: hash };

  return await prisma.userModel.create({ data: newUser });
}

export async function validateLoginAndReturnSession(
  email: string,
  password: string,
): Promise<string | null> {
  const user = await prisma.userModel.findUnique({
    where: {
      email: email,
    },
  });

  if (user === null) {
    return null;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return null;
  }

  const sessionToken = nanoid();
  await prisma.userModel.update({
    where: {
      email: email,
    },
    data: {
      session: sessionToken,
    },
  });

  return sessionToken;
}
