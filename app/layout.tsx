import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const descripcionSitio =
  "Amplifica2 es un medio musical con base en Rosario que combina agenda, entrevistas, coberturas e historias para descubrir artistas y propuestas locales.";

export const metadata: Metadata = {
  metadataBase: new URL("https://amplifica2.com.ar"),
  title: {
    default: "Amplifica2",
    template: "%s · Amplifica2",
  },
  description: descripcionSitio,
  openGraph: {
    title: "Amplifica2",
    description: descripcionSitio,
    url: "https://amplifica2.com.ar",
    siteName: "Amplifica2",
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amplifica2",
    description: descripcionSitio,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={montserrat.variable}>
      <body>{children}</body>
    </html>
  );
}
