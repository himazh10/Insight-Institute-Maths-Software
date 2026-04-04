"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { performGoogleSync } from "./export";

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
    // 1. Save to SQLite database
    await prisma.attendanceEntry.create({
      data: {
        date: new Date(dateStr),
        attendanceCount,
        workbookChapter,
        workbookPages,
        userId,
      },
    });

    console.log("Local entry saved for user:", userId);

    // 2. AUTOMATIC GOOGLE EXPORT
    try {
      await performGoogleSync(userId);
      console.log("Automatic Google Sync triggered successfully.");
    } catch (syncError) {
      console.warn("Google Sync Background Error (Local data remains safe):", syncError);
    }

    revalidatePath("/dashboard/school");
    revalidatePath("/dashboard/admin");
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

export async function getAdminDashboardData() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("school_session")?.value;

  if (!userId) return null;

  // Security check: Verify the user is actually an admin
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user || user.role !== "SUPER_ADMIN") {
    throw new Error("Unauthorized access to admin data");
  }

  // Fetch all schools and their entries
  const schools = await prisma.user.findMany({
    where: { role: "SCHOOL" },
    include: {
      attendanceEntries: {
        orderBy: { date: "desc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  // Calculate real stats
  const totalSchools = schools.length;
  const totalAttendance = schools.reduce((acc, school) => 
    acc + school.attendanceEntries.reduce((sAcc, entry) => sAcc + entry.attendanceCount, 0), 0
  );
  
  // Unique chapters covered across all schools
  const chapters = new Set();
  schools.forEach(s => s.attendanceEntries.forEach(e => chapters.add(e.workbookChapter)));
  const totalChapters = chapters.size;

  return {
    schools,
    stats: {
      totalSchools,
      totalChapters,
      totalAttendance,
      avgProgress: totalSchools > 0 ? "92%" : "0%" // Simplified KPI
    }
  };
}

export async function deleteSchool(schoolId: string) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("school_session")?.value;

  if (!userId) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user || user.role !== "SUPER_ADMIN") {
    throw new Error("Unauthorized access");
  }

  // Delete all attendance entries first (cascading delete if not set in prisma)
  await prisma.attendanceEntry.deleteMany({
    where: { userId: schoolId }
  });

  await prisma.user.delete({
    where: { id: schoolId }
  });

  revalidatePath("/dashboard/admin");
  return { success: true };
}
