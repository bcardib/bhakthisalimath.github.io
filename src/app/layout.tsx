// app/layout.tsx
import "@/styles/globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import { Providers } from "./providers";
import FluidCursor from "@/components/FluidCursor";

export const metadata: Metadata = {
  title: "Bhakthi Salimath | Portfolio",
  description:
    "This is the personal portfolio of Bhakthi Salimath, an Advanced Computing student at the University of Sydney majoring in Computer Science.",
};

const themeScript = `
(function() {
  var k = 'portfolio-theme';
  var t = localStorage.getItem(k);
  if (t === 'light' || t === 'dark') {
    document.documentElement.setAttribute('data-theme', t);
  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning data-theme="dark">
      <body className="antialiased">
        <Script id="theme-init" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <Providers>
          <FluidCursor />
          <Navbar />
          <main className="main-layout">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
