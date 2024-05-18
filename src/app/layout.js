import { yekan } from "@/utils/fonts";
import "./globals.css";



export const metadata = {
  title: "پروژه املاک",
  description: "2-A app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={yekan.className}>{children}</body>
    </html>
  );
}
