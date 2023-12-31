"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { css } from "#ss/css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${bodyCss}`}>
        <header className={`${headerCss} full-fledge`}>This is A header</header>
        <aside className={sidebarCss} id="sidebar">
          <section>Section 1</section>
          <section>Section 2</section>
          <section>Section 3</section>
        </aside>
        <main className={mainCss}>{children}</main>

        <footer className={`full-fledge ${footerCss}`}>Nothing here</footer>
      </body>
    </html>
  );
}

// create css for body
const bodyCss = css({
  "--body-pad": {
    base: "40px",
    xl: "80px",
    "2xl": "160px",
  },
  display: "grid",
  gridTemplateColumns: "var(--body-pad) 160px 1fr var(--body-pad)",
  gridTemplateRows: "auto 1fr auto",
  minHeight: "100vh",
  "& .full-fledge": {
    gridColumn: "1 / -1",
  },
});

const headerCss = css({
  py: "5",
  px: "var(--body-pad)",
  border: "1px solid red",
});

const sidebarCss = css({
  gridColumn: "2 / 3",
  px: "5",
  py: "5",
  border: "1px solid turquoise",
});

const mainCss = css({
  gridColumn: "3 / 4",
  px: "10",
  py: "10",
  border: "1px solid blue",
});

const footerCss = css({
  py: "5",
  px: "var(--body-pad)",
  border: "salmon 1px solid",
});
