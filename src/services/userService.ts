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
  await prisma.session.create({
    data: {
      token: sessionToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 30 * 60 * 1000),
    },
  });

  return sessionToken;
}

export async function getLoggedInUser(token: string | undefined) {
  if (token === undefined) {
    return null;
  }

  const session = await prisma.session.findUnique({
    where: { token: token },
    include: { user: true },
  });

  if (session === null) {
    return null;
  }
  return session.user;
}

export async function logout(token: string | undefined) {
  if (token === undefined) {
    return;
  }

  await prisma.session.delete({
    where: {
      token: token,
    },
  });
}