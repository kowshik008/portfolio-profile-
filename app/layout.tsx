import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kowshik Sravanam — Aspiring AI Engineer & Tech Enthusiast",
  description: "Portfolio of Kowshik Sravanam — Aspiring AI Engineer, First-Year B.Tech Student at NIAT, passionate about Artificial Intelligence, Machine Learning, Python, and practical software engineering.",
  metadataBase: new URL("https://github.com/kowshik008/portfolio-profile-"),
  openGraph: {
    title: "Kowshik Sravanam — Aspiring AI Engineer",
    description: "First-Year B.Tech Student at NIAT passionate about Artificial Intelligence, Python, and building impactful technology.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
