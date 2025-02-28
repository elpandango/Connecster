import type {Metadata} from "next";
import "./globals.css";
import SiteHeaderUnAuth from "@/components/SiteHeader/site-header-unauth";

export const metadata: Metadata = {
  title: "Connecster",
  description: "Connecster App",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
    <body>
    <SiteHeaderUnAuth/>
    {children}
    </body>
    </html>
  );
}
