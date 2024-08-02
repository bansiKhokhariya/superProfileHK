// import { ReactNode } from "react";
// import { Inter } from "next/font/google";
// import { Viewport } from "next";
// import PlausibleProvider from "next-plausible";
// import { getSEOTags } from "@/libs/seo";
// import ClientLayout from "@/components/LayoutClient";
// import config from "@/config";
// import "./globals.css";

// const font = Inter({ subsets: ["latin"] });

// export const viewport: Viewport = {
//   // Will use the primary color of your theme to show a nice theme color in the URL bar of supported browsers
//   themeColor: config.colors.main,
//   width: "device-width",
//   initialScale: 1,
// };

// // This adds default SEO tags to all pages in our app.
// // You can override them in each page passing params to getSOTags() function.
// export const metadata = getSEOTags();

// export default function RootLayout({ children }: { children: ReactNode }) {
//   return (
//     <html lang="en" data-theme={config.colors.theme} className={font.className}>
//       {config.domainName && (
//         <head>
//           <PlausibleProvider domain={config.domainName} />
//         </head>
//       )}
//       <body>
//         {/* ClientLayout contains all the client wrappers (Crisp chat support, toast messages, tooltips, etc.) */}
//         <ClientLayout>{children}</ClientLayout>
//       </body>
//     </html>
//   );
// }

'use client'

import React, { useState } from "react";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import PlausibleProvider from "next-plausible";
import { getSEOTags } from "@/libs/seo";
import ClientLayout from "@/components/LayoutClient";
import config from "@/config";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './globals.css';

const font = Inter({ subsets: ["latin"] });

// export const metadata = getSEOTags();

export default function RootLayout({ children }: { children: ReactNode }) {
  // Client-only logic should be inside the component
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en" data-theme={config.colors.theme} className={font.className}>
      <head>
        {config.domainName && (
          <PlausibleProvider domain={config.domainName} />
        )}
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <ClientLayout>{children}</ClientLayout>
        </QueryClientProvider>
      </body>
    </html>
  );
}
