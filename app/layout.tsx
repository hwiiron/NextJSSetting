import "@/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js Project Setting",
  description:
    "Next.js(React 18 Version), TypeScript, Tailwind(3 Version), Prettier, ESLint Install & Setting",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* Pretendard Font CDN */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
          crossOrigin="anonymous"
        />
      </head>

      <body>{children}</body>
    </html>
  );
}
