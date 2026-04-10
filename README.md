# 📊 Insight Institute Maths Software (Maths Monitor)

A comprehensive attendance and workbook progress tracking system designed for schools. This application allows administrators to monitor student participation and academic progress across different chapters and pages.

## 🚀 Features

- **Multi-Role Access:** Support for Super Admin and School-level users.
- **Attendance Tracking:** Easily record and monitor student attendance.
- **Workbook Progress:** Track progress through specific chapters and pages.
- **Global Deployment:** Optimized for Vercel with PostgreSQL integration.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org) (App Router)
- **Authentication:** [NextAuth.js](https://next-auth.js.org)
- **Database:** [Prisma](https://www.prisma.io) with **PostgreSQL** (Vercel Postgres)
- **Styling:** [Tailwind CSS](https://tailwindcss.com) & [Framer Motion](https://www.framer.com/motion/)
- **Charts/Icons:** [Lucide React](https://lucide.dev)

## 🌐 Deployment

To deploy this project globally:

1.  **Clone the Repository:** `git clone https://github.com/himazh10/Insight-Institute-Maths-Software.git`
2.  **Install Dependencies:** `npm install`
3.  **Database Setup:**
    *   Set up a **Vercel Postgres** database.
    *   Update your `.env` with `POSTGRES_PRISMA_URL` and `POSTGRES_URL_NON_POOLING`.
4.  **Prisma Migrations:** `npx prisma migrate dev`
5.  **Build & Deploy:** `npm run build`

## 📄 License

This project is private and for internal use only.
