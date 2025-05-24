import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CarritoProvider } from "@/context/CarritoContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FauntixShop | Tu tienda online de confianza",
  description: "Compra ropa, calzado y accesorios de calidad en FauntixShop. Envíos rápidos y atención personalizada.",
  keywords: ["ecommerce", "ropa", "zapatos", "tienda online", "FauntixShop", "accesorios", "moda"],
  authors: [{ name: "FauntixShop" }],
  creator: "FauntixShop",
  openGraph: {
    title: "FauntixShop",
    description: "Tu tienda online de confianza",
    url: "https://fauntixshop.com",
    siteName: "FauntixShop",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FauntixShop",
    description: "Compra ropa, calzado y accesorios de calidad.",
    creator: "@fauntixshop",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <meta
          name="google-site-verification"
          content="zhOLN7elZTrCl0bO4wrCCEGV1_NOL2sBJrvD6XPVoFI"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900 dark:bg-black dark:text-white`}
      >
        <CarritoProvider>{children}</CarritoProvider>
      </body>
    </html>
  );
}
