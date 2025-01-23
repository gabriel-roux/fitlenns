import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "@/styles/globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "FitLenns - Seu guia para uma vida mais saudável",
  description: "O FitLens é um aplicativo que te ajuda a manter uma alimentação saudável e equilibrada, com base nas suas necessidades diárias.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
