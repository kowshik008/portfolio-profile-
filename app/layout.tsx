import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kowshik Sravanam — AI Engineer",
  description: "Kowshik Sravanam builds intelligent experiences at the intersection of AI, engineering and creativity.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Kowshik Sravanam — AI Engineer",
    description: "Building intelligent experiences.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
