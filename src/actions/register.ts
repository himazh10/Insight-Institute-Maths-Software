"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function registerSchool(formData: FormData) {
  const schoolName = formData.get("schoolName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!schoolName || !email || !password) {
    throw new Error("Missing fields");
  }

  let user;
  try {
    user = await prisma.user.create({
      data: {
        schoolName,
        email,
        password, 
        role: "SCHOOL",
      },
    });

    console.log("School registered:", user.id);
  } catch (error) {
    console.error("Registration error:", error);
    throw new Error("Email already exists or registration failed");
  }

  // Set session cookie
  const cookieStore = await cookies();
  cookieStore.set("school_session", user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  });

  // Redirect to school dashboard after successful registration
  redirect("/dashboard/school");
}
