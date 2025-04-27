import type { Metadata } from "next";
import { Poppins }from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "600", "700"],  // Regular, Semi-bold, Bold
  subsets: ["latin"],
  variable: "--font-poppins",     // 🆕 Custom CSS variable name
});

export const metadata: Metadata = {
  title: "Calories Counter",
  description: "A simple calorie counter app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
