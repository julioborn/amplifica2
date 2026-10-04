import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Amplifica2",
    template: "%s · Amplifica2",
  },
  description:
    "Amplifica2 es un medio musical con base en Rosario que combina agenda, entrevistas, coberturas e historias para descubrir artistas y propuestas locales.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={montserrat.variable}>
      <body>{children}</body>
    </html>
  );
}
