import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cadastro de Corredores - Circuito Piauiense de Corridas na Natureza",
  description: "Formulário de cadastro para participantes do Circuito Piauiense de Corridas na Natureza.",
  openGraph: {
    title: "Cadastro de Corredores - Circuito Piauiense de Corridas na Natureza",
    description: "Formulário de cadastro para participantes do Circuito Piauiense de Corridas na Natureza.",
    url: "https://cadastro-cpcn.mauboa.com.br", // Substitua pelo seu URL real
    siteName: "Circuito Piauiense de Corridas na Natureza",
    images: [
      {
        url: "/logo-cpcn.png", // Caminho relativo à pasta public
        width: 800,
        height: 600,
        alt: "Logo do Circuito Piauiense de Corridas na Natureza",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cadastro de Corredores - Circuito Piauiense de Corridas na Natureza",
    description: "Formulário de cadastro para participantes do Circuito Piauiense de Corridas na Natureza.",
    images: ["/logo-cpcn.png"], // Caminho relativo à pasta public
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3H46SXYQYE"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-3H46SXYQYE');
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}