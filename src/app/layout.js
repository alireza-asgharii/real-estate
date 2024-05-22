import { yekan } from "@/utils/fonts";
import "./globals.css";

//Layout
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { Toaster } from "react-hot-toast";
import SessionProviders from "@/providers/SessionProviders";

export const metadata = {
  title: "پروژه املاک",
  description: "2-A app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${yekan.className} max-w-7xl mx-auto`}>
        <ReactQueryProvider>
          <SessionProviders>
            <Header />
            <main className="min-h-screen pt-3">{children}</main>
            <Footer />
            <Toaster />
          </SessionProviders>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
