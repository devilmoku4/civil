import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import FloatingButtons from "@/components/FloatingButtons";
import { siteData } from "@/data/siteData";
import ScrollProgress from "@/components/ScrollProgress";
import SmoothScroll from "@/components/SmoothScroll";
import SEOSchema from "@/components/SEOSchema";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"]
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"]
});

export const metadata = {
  title: "Adithi Construction - Luxury Civil Engineering & Residential Projects | Chethan M J",
  description:
    "Adithi Construction: Premium civil engineering, luxury residential projects, villas, and construction services by Chethan M J in Mysore, Karnataka. Expert site execution and finish quality.",
  keywords:
    "Adithi construction, civil engineer, luxury villas, residential projects, Mysore construction, civil engineering services, architectural construction, project management",
  authors: [{ name: "Chethan M J" }],
  creator: "Chethan M J",
  publisher: "Adithi Construction",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://adithi-construction.vercel.app",
    siteName: "Adithi Construction",
    title: "Adithi Construction - Luxury Civil Engineering & Residential Projects",
    description:
      "Premium civil engineering and luxury residential construction. Villas, boutique hotels, and high-spec commercial spaces.",
    images: [
      {
        url: "https://adithi-construction.vercel.app/images/Adithi_Construction.jpg",
        width: 1200,
        height: 630,
        alt: "Adithi Construction"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Adithi Construction - Luxury Civil Engineering",
    description: "Premium residential and commercial construction services by Chethan M J"
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable} ${poppins.variable} bg-(--background) text-(--foreground) antialiased`}>
        <SEOSchema />
        <SmoothScroll />
        <ScrollProgress />
        {children}
        {
          (() => {
            const contact = siteData.contact || {};
              const waHref = contact.whatsappHref || (contact.whatsapp || contact.phone || "+919876543210").toString().replace(/\s+/g, "").replace(/^\+/, "");
              const telHref = contact.telHref || `tel:${(contact.phone || contact.whatsapp || "+919876543210").toString().replace(/\s+/g, "")}`;

              // ensure waHref is fully qualified URL
              const finalWaHref = waHref.startsWith("http") ? waHref : `https://wa.me/${waHref}`;

              return <FloatingButtons waHref={finalWaHref} telHref={telHref} />;
          })()
        }
      </body>
    </html>
  );
}
