import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import ExcelJS from "exceljs";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const schoolId = searchParams.get("schoolId");

  if (!schoolId) return new NextResponse("Missing School ID", { status: 400 });

  try {
    let entries: any[] = [];
    let schoolName = "";

    if (schoolId === "global-admin") {
      schoolName = "GLOBAL NETWORK";
      entries = await prisma.attendanceEntry.findMany({
        include: { user: true },
        orderBy: { date: 'desc' }
      });
    } else {
      const school = await prisma.user.findUnique({
        where: { id: schoolId },
        include: { attendanceEntries: { orderBy: { date: 'desc' } } }
      });
      if (!school) return new NextResponse("Institution not found", { status: 404 });
      schoolName = school.schoolName?.toUpperCase() || "INSTITUTION";
      entries = school.attendanceEntries.map(e => ({ ...e, user: school }));
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("INTELLIGENCE DATA");

    // Title Row
    worksheet.mergeCells('A1:E1');
    const titleCell = worksheet.getCell('A1');
    titleCell.value = `INSIGHT INSTITUTE - ${schoolName} PERFORMANCE GRID`;
    titleCell.font = { name: 'Arial Black', size: 14, color: { argb: 'FFFFFFFF' } };
    titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
    titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E40AF' } };

    // Set Column Headers (Capitalized)
    worksheet.getRow(3).values = ["DATE", "INSTITUTION", "ATTENDANCE", "CHAPTER", "PAGES"];
    worksheet.columns = [
      { key: "date", width: 20 },
      { key: "school", width: 40 },
      { key: "attendance", width: 15 },
      { key: "chapter", width: 25 },
      { key: "pages", width: 20 },
    ];

    // Style Headers
    const headerRow = worksheet.getRow(3);
    headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' }, name: 'Arial' };
    headerRow.alignment = { horizontal: 'center' };
    headerRow.eachCell(cell => {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF3B82F6' } };
      cell.border = { bottom: { style: 'thin' } };
    });

    // Add Data with Beauty
    entries.forEach((e, index) => {
      const row = worksheet.addRow({
        date: new Date(e.date).toLocaleDateString().toUpperCase(),
        school: (e.user.schoolName || "N/A").toUpperCase(),
        attendance: `${e.attendanceCount} UNITS`,
        chapter: e.workbookChapter.toUpperCase(),
        pages: e.workbookPages.toUpperCase(),
      });

      row.alignment = { horizontal: 'center' };
      row.font = { name: 'Arial', size: 10 };
      
      // Zebra Striping
      if (index % 2 === 0) {
        row.eachCell(cell => {
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF8FAFC' } };
        });
      }
    });

    const buffer = await workbook.xlsx.writeBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename=Insight_Excel_${schoolId}.xlsx`,
      },
    });

  } catch (error) {
    console.error("Excel Export Error:", error);
    return new NextResponse("Failed to generate spreadsheet", { status: 500 });
  }
}
