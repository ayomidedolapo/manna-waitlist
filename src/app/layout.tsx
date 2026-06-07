import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Manna Waitlist",
  description: "Skip the traffic, the heat, and the market queues. Manna brings farm-fresh produce straight to your doorstep, handling the logistics so you can focus on what matters. Join the waitlist for early access to the Manna standard.",
  openGraph: {
    title: "Manna Waitlist",
    description: "Skip the traffic, the heat, and the market queues. Manna brings farm-fresh produce straight to your doorstep.",
    images: [
      {
        url: "/MANNA@3x_061045.jpg.jpeg", // Ensure this image is in your /public folder
        width: 1200,
        height: 630,
        alt: "Manna Agritech Waitlist",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
