import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Navbar } from "@/components/navigation/Navbar";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "autentic.ai | Chat with your customer feedback",
  description: "autentic.ai helps Product teams uncover real user needs by turning scattered feedback into actionable insights — with source clips and full context, just a chat away.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="light">
      <body
        className={`${plusJakartaSans.variable} antialiased font-sans bg-white text-black`}
      >
        <Navbar />
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}
