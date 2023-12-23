import {
  Form,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import styles from "./app.css";
import { LinksFunction } from "@remix-run/node";
import { css } from "#ss/css";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className={bodyCss}>
        <header className={`${headerCss} full-fledge`}>This is A header</header>
        <aside className={sidebarCss} id="sidebar">
          <section>Section 1</section>
          <section>Section 2</section>
          <section>Section 3</section>
        </aside>
        <main className={mainCss}>
          <Outlet />
        </main>

        <footer className={`full-fledge ${footerCss}`}>Nothing here</footer>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
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
