"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

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

  // Set session cookie
  const cookieStore = await cookies();
  cookieStore.set("school_session", user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  });

  // Determine redirect based on role
  if (user.role === "SUPER_ADMIN") {
    redirect("/dashboard/admin");
  } else {
    redirect("/dashboard/school");
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("school_session");
  redirect("/login");
}
