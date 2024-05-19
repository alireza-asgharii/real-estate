import { yekan } from "@/utils/fonts";
import "./globals.css";

//Layout
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "پروژه املاک",
  description: "2-A app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${yekan.className} max-w-7xl mx-auto`}
      >
        <Header />
        <main className="min-h-screen px-2">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
