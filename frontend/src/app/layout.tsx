import "./globals.css";

import { QueryProvider } from "@/providers/query-provider";

export const metadata = {
  title: "Geoblocking PoC",
  description: "Hybrid geoblocking proof of concept",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
