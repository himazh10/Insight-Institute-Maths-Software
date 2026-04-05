"use server";

import { prisma } from "@/lib/prisma";
import { getGoogleAuthClient, sheets, docs } from "@/lib/google";
import fs from "fs";
import path from "path";

const TARGET_SHEET_ID = process.env.GOOGLE_SHEET_ID || ""; 
const TARGET_DOC_ID = process.env.GOOGLE_DOC_ID || "";
const KEY_FILE_PATH = path.join(process.cwd(), "service-account.json");

function hasCredentials() {
  return fs.existsSync(KEY_FILE_PATH);
}

export async function performGoogleSync(schoolId: string) {
  if (!hasCredentials()) {
    return { success: false, message: "Credentials missing (service-account.json not found)" };
  }
  return {
    sheets: await syncToGoogleSheets(schoolId),
    docs: await exportToGoogleDocs(schoolId)
  };
}

export async function exportToGoogleDocs(schoolId: string) {
  try {
    if (!hasCredentials()) return { success: false, message: "Google API credentials (service-account.json) are missing." };
    if (!TARGET_DOC_ID) return { success: false, message: "GOOGLE_DOC_ID not configured in environment variables." };

    let entries: any[] = [];
    let titlePrefix = "";

    if (schoolId === "global-admin") {
      const allEntries = await prisma.attendanceEntry.findMany({
        include: { user: true },
        orderBy: { date: 'desc' },
      });
      entries = allEntries;
      titlePrefix = "GLOBAL NETWORK";
    } else {
      const school = await prisma.user.findUnique({
        where: { id: schoolId },
        include: { attendanceEntries: { orderBy: { date: 'desc' } } },
      });
      if (!school) throw new Error("Institution not found.");
      entries = school.attendanceEntries.map(e => ({ ...e, user: school }));
      titlePrefix = school.schoolName || "INSTITUTION";
    }

    const auth = await getGoogleAuthClient();
    const googleDocs = docs(auth);

    const date = new Date().toLocaleDateString();
    const title = `INSIGHT MATHS PROGRESS REPORT - ${titlePrefix}\n`;
    const summary = `Generated on: ${date} | Total Records: ${entries.length}\n\n`;
    
    let entriesText = "DETAILED PERFORMANCE LOG:\n";
    entries.forEach(e => {
      entriesText += `• Date: ${e.date.toDateString()} | School: ${e.user.schoolName} | Att: ${e.attendanceCount} | Chapter: ${e.workbookChapter} | Pages: ${e.workbookPages}\n`;
    });

    await googleDocs.documents.batchUpdate({
      documentId: TARGET_DOC_ID,
      requestBody: {
        requests: [
          {
            insertText: {
              location: { index: 1 },
              text: `${title}${summary}${entriesText}\n-------------------\n\n`
            }
          }
        ]
      }
    });

    return {
      success: true,
      url: `https://docs.google.com/document/d/${TARGET_DOC_ID}/edit`,
      message: `Sync successful.`
    };

  } catch (error: any) {
    console.error("Docs Export Error:", error);
    return { success: false, message: error.message };
  }
}

export async function syncToGoogleSheets(schoolId: string) {
  try {
    if (!hasCredentials()) return { success: false, message: "Google API credentials (service-account.json) are missing." };
    if (!TARGET_SHEET_ID) return { success: false, message: "GOOGLE_SHEET_ID not configured in environment variables." };

    let entries: any[] = [];
    if (schoolId === "global-admin") {
      entries = await prisma.attendanceEntry.findMany({
        include: { user: true },
        orderBy: { date: 'desc' },
      });
    } else {
      const school = await prisma.user.findUnique({
        where: { id: schoolId },
        include: { attendanceEntries: { orderBy: { date: 'desc' } } },
      });
      if (!school) throw new Error("Institution not found.");
      entries = school.attendanceEntries.map(e => ({ ...e, user: school }));
    }

    const auth = await getGoogleAuthClient();
    const googleSheets = sheets(auth);

    const values = [
      ["Date", "School Name", "Attendance", "Workbook Chapter", "Pages Covered"],
      ...entries.map(e => [
        e.date.toDateString(),
        e.user.schoolName,
        e.attendanceCount,
        e.workbookChapter,
        e.workbookPages
      ])
    ];

    await googleSheets.spreadsheets.values.update({
      spreadsheetId: TARGET_SHEET_ID,
      range: "Sheet1!A1",
      valueInputOption: "RAW",
      requestBody: { values },
    });

    return {
      success: true,
      url: `https://docs.google.com/spreadsheets/d/${TARGET_SHEET_ID}/edit`,
      message: `Sync successful.`
    };

  } catch (error: any) {
    console.error("Sheets Sync Error:", error);
    return { success: false, message: error.message };
  }
}
