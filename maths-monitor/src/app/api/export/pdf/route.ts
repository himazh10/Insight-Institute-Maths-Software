import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jsPDF from "jspdf";
import "jspdf-autotable";

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

    const doc = new jsPDF() as any;

    // Header Design
    doc.setFillColor(30, 64, 175); // Dark Blue
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("INSIGHT INSTITUTE", 105, 15, { align: "center" });
    
    doc.setFontSize(10);
    doc.text(`INTELLIGENCE PERFORMANCE REPORT: ${schoolName}`, 105, 25, { align: "center" });
    doc.text(`DATE GENERATED: ${new Date().toLocaleDateString().toUpperCase()}`, 105, 32, { align: "center" });

    // Table
    const tableData = entries.map(e => [
      new Date(e.date).toLocaleDateString().toUpperCase(),
      (e.user.schoolName || "N/A").toUpperCase(),
      `${e.attendanceCount} UNITS`,
      e.workbookChapter.toUpperCase(),
      e.workbookPages.toUpperCase()
    ]);

    doc.autoTable({
      startY: 50,
      head: [['DATE', 'INSTITUTION', 'ATT', 'CHAPTER', 'PAGES']],
      body: tableData,
      theme: 'grid',
      headStyles: { 
        fillColor: [59, 130, 246], 
        textColor: 255, 
        fontStyle: 'bold',
        halign: 'center'
      },
      styles: { 
        fontSize: 8, 
        cellPadding: 4,
        halign: 'center',
        font: 'helvetica'
      },
      alternateRowStyles: { 
        fillColor: [248, 250, 252] 
      }
    });

    const buffer = Buffer.from(doc.output('arraybuffer'));

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=Insight_Report_${schoolId}.pdf`,
      },
    });

  } catch (error) {
    console.error("PDF Export Error:", error);
    return new NextResponse("Failed to generate PDF", { status: 500 });
  }
}
