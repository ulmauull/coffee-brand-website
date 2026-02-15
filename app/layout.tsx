import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/lib/lenis";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Calf Coffee | Fresh. Smooth. Everyday.",
  description: "Premium brewed coffee with selected Arabica beans and fresh milk.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} antialiased`}
      >
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
