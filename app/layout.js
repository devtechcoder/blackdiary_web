import Script from "next/script";
import RouteSchema from "../components/SEO/RouteSchema";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import "react-owl-carousel2/lib/styles.css";
import "react-owl-carousel2/src/owl.theme.default.css";
import "../src/assets/styles/main.css";
import "../src/assets/styles/responsive.css";

import ClientRoot from "../src/next/ClientRoot";
import { DEFAULT_SEO } from "../src/seo";
import { generateSEOMetadata } from "../src/lib/seo";

export const metadata = {
  ...generateSEOMetadata(DEFAULT_SEO),
  verification: {
    google: "DVKvtByeIN-28cJ81568DMtHCfMyBl8SiO1gpicVkrE",
    other: {
      "p:domain_verify": "229cedd1f5ab84c11fe42bc189f71cca",
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.png",
    apple: "/logo192.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content="#000000" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@500;600;700;800&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
      </head>
      <body>
        <div className="app-shell">
          <RouteSchema />
          <ClientRoot>{children}</ClientRoot>
        </div>
        <Script src="https://t.contentsquare.net/uxa/dc3706aa854f8.js" strategy="afterInteractive" />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-7TPVTC5M3X" strategy="afterInteractive" />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-7TPVTC5M3X');
            `,
          }}
        />
      </body>
    </html>
  );
}
