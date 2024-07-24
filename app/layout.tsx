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

'use client';
import { ReactNode, useState, useEffect } from "react";
import { Inter } from "next/font/google";
import { Viewport } from "next";
import PlausibleProvider from "next-plausible";
import { getSEOTags } from "@/libs/seo";
import ClientLayout from "@/components/LayoutClient";
import config from "@/config";
import { magic } from "@/libs/magic";
import { UserContext } from "@/libs/UserContext"; // Make sure the path is correct
import { useRouter } from 'next/navigation'
import "./globals.css";

const font = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: config.colors.main,
  width: "device-width",
  initialScale: 1,
};

 type User = {
  loading: boolean;
  email?: string;
  issuer?: string;
};

// export const metadata = getSEOTags();

export default function RootLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    setUser({ loading: true });
    magic.user.isLoggedIn().then((isLoggedIn) => {
      if (isLoggedIn) {
        magic.user.getMetadata().then((userData) => {
          setUser({ ...userData, loading: false });
        });
      } else {
        router.push('/');
        setUser({ loading: false });
      }
    });
  }, []);

  return (
    <html lang="en" data-theme={config.colors.theme} className={font.className}>
      {config.domainName && (
        <head>
          <PlausibleProvider domain={config.domainName} />
        </head>
      )}
      <body>
        <UserContext.Provider value={[user, setUser]}>
          <ClientLayout>{children}</ClientLayout>
        </UserContext.Provider>
      </body>
    </html>
  );
}
