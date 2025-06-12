import prisma from '@/lib/prisma';
import { userSchema } from "@/lib/validators/user";
import type { Prisma } from '@/generated/prisma';

export async function createUser(data: Prisma.UserModelCreateInput) {
  const parsed = userSchema.parse(data); 
  return await prisma.userModel.create({ data });
}
