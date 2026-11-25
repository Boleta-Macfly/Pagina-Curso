import type { Metadata, Viewport } from "next";
import { Inter, Saira } from "next/font/google";
import { site } from "@/config/site";
import { AdvisorChooser } from "@/components/AdvisorChooser";
import { IntroSplash } from "@/components/IntroSplash";
import "./globals.css";

const saira = Saira({
  variable: "--font-saira",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Cursos de PPF y Tratamiento Cerámico en Perú`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "curso de PPF",
    "curso PPF Perú",
    "tratamiento cerámico",
    "curso de detailing",
    "Paint Protection Film",
    "Feynlab Perú",
    "AF Detailing",
  ],
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    title: `${site.name} | Cursos de PPF y Tratamiento Cerámico`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${saira.variable} ${inter.variable} antialiased`} suppressHydrationWarning>
      <head>
        {/* Omite la intro si ya se vio en esta sesión o si se prefiere menos movimiento */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(sessionStorage.getItem('afa-intro-vista')==='1'||matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('no-intro')}catch(e){}",
          }}
        />
      </head>
      <body className="min-h-dvh">
        <IntroSplash />
        {children}
        <AdvisorChooser />
      </body>
    </html>
  );
}
