import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "US CMA Prep - Free Structured Preparation Platform",
  description: "Complete, free, and structured preparation for US CMA aspirants. Notes, Mocks, and Study Plans.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <footer className="footer">
          <p>© {new Date().getFullYear()} US CMA Prep. Free & Open Access.</p>
        </footer>
      </body>
    </html>
  );
}
