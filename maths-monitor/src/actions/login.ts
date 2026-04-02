"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    throw new Error("Missing email or password");
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || user.password !== password) {
    throw new Error("Invalid credentials");
  }

  // Determine redirect based on role
  if (user.role === "SUPER_ADMIN") {
    redirect("/dashboard/admin");
  } else {
    redirect("/dashboard/school");
  }
}
