import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, AlignmentType, WidthType, BorderStyle } from "docx";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const schoolId = searchParams.get("schoolId");

  if (!schoolId) return new NextResponse("Missing School ID", { status: 400 });

  try {
    let title = "";
    let entries: any[] = [];

    if (schoolId === "global-admin") {
      title = "GLOBAL NETWORK PERFORMANCE REPORT";
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
      title = `PERFORMANCE REPORT: ${school.schoolName?.toUpperCase()}`;
      entries = school.attendanceEntries.map(e => ({ ...e, user: school }));
    }

    // Create Word Document
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            text: "INSIGHT INSTITUTE",
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            text: title,
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `Generated on: ${new Date().toLocaleDateString()}`, bold: true }),
              new TextRun({ text: ` | Total Records: ${entries.length}`, bold: true }),
            ],
            spacing: { after: 400 },
          }),

          // Data Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  "Date", "Institution", "Att", "Chapter", "Pages"
                ].map(text => new TableCell({
                  children: [new Paragraph({ children: [new TextRun({ text, bold: true })] })],
                  shading: { fill: "f2f2f2" }
                }))
              }),
              ...entries.map(e => new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph(new Date(e.date).toLocaleDateString())] }),
                  new TableCell({ children: [new Paragraph(e.user.schoolName || "N/A")] }),
                  new TableCell({ children: [new Paragraph(e.attendanceCount.toString())] }),
                  new TableCell({ children: [new Paragraph(e.workbookChapter)] }),
                  new TableCell({ children: [new Paragraph(e.workbookPages)] }),
                ]
              }))
            ]
          }),

          new Paragraph({
            text: "\nEnd of Intelligence Report.",
            alignment: AlignmentType.CENTER,
            spacing: { before: 800 },
          })
        ],
      }],
    });

    const buffer = await Packer.toBuffer(doc);

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename=Insight_Report_${schoolId}.docx`,
      },
    });

  } catch (error) {
    console.error("Word Export Error:", error);
    return new NextResponse("Failed to generate document", { status: 500 });
  }
}
