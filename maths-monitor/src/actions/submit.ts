"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitAttendance(formData: FormData, userId: string) {
  const dateStr = formData.get("date") as string;
  const attendanceCount = parseInt(formData.get("attendanceCount") as string);
  const workbookChapter = formData.get("workbookChapter") as string;
  const workbookPages = formData.get("workbookPages") as string;

  if (!dateStr || isNaN(attendanceCount) || !workbookChapter || !workbookPages) {
    throw new Error("Invalid submission data");
  }

  await prisma.attendanceEntry.create({
    data: {
      date: new Date(dateStr),
      attendanceCount,
      workbookChapter,
      workbookPages,
      userId,
    },
  });

  revalidatePath("/dashboard/school");
}
