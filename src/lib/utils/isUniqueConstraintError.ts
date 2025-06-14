import { Prisma } from "@/generated/prisma";

export function isUniqueConstraintError(
  error: unknown,
  field: string,
): boolean {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002" &&
    error.meta?.target?.includes(field)
  );
}
