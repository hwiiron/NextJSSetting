import "@/app/globals.css";
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
      <body>{children}</body>
    </html>
  );
}
