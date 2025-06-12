import prisma from '@/lib/prisma';
import { userSchema } from "@/lib/validators/user";
import type { Prisma } from '@/generated/prisma';
import bcrypt from 'bcrypt';


export async function createUser(data: Prisma.UserModelCreateInput) {
  const parsed = userSchema.parse(data); 
  const hash = await bcrypt.hash(data.password, 10);
  data.password = hash
  return await prisma.userModel.create({ data });
}
