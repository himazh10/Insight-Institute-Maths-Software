"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function registerSchool(formData: FormData) {
  const schoolName = formData.get("schoolName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!schoolName || !email || !password) {
    throw new Error("Missing fields");
  }

  try {
    // Basic implementation (password should be hashed in production!)
    const user = await prisma.user.create({
      data: {
        schoolName,
        email,
        password, // TODO: Use bcrypt to hash passwords
        role: "SCHOOL",
      },
    });

    console.log("School registered:", user.id);
  } catch (error) {
    console.error("Registration error:", error);
    throw new Error("Email already exists or registration failed");
  }

  // Redirect to school dashboard after successful registration
  redirect("/dashboard/school");
}
