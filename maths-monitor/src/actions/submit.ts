"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function submitAttendance(formData: FormData) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("school_session")?.value;

  if (!userId) {
    throw new Error("Unauthorized: No session found");
  }

  const dateStr = formData.get("date") as string;
  const attendanceCount = parseInt(formData.get("attendanceCount") as string);
  const workbookChapter = formData.get("workbookChapter") as string;
  const workbookPages = formData.get("workbookPages") as string;

  if (!dateStr || isNaN(attendanceCount) || !workbookChapter || !workbookPages) {
    throw new Error("Invalid submission data");
  }

  try {
    await prisma.attendanceEntry.create({
      data: {
        date: new Date(dateStr),
        attendanceCount,
        workbookChapter,
        workbookPages,
        userId,
      },
    });

    console.log("Entry submitted for user:", userId);
    revalidatePath("/dashboard/school");
  } catch (error) {
    console.error("Submission error:", error);
    throw new Error("Failed to save entry");
  }
}

export async function getSchoolData() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("school_session")?.value;

  if (!userId) return null;

  const school = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      attendanceEntries: {
        orderBy: { date: "desc" },
      },
    },
  });

  return school;
}
