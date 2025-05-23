import type { Metadata } from "next";
import "./base.css";
import "./../components/button/button.css";

import Auth from "@/components/Auth";

export const metadata: Metadata = {
  title: "Sitomnia",
};

import { DiscussionProvider } from '@/context/DiscussionContext';
import { RiskProvider } from '@/context/RiskContext';
import { NotesProvider } from '@/context/NotesContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <main>
          <Auth>
            <NotesProvider>
              <DiscussionProvider>
                <RiskProvider>
                  {children}
                </RiskProvider>
              </DiscussionProvider>
            </NotesProvider>
          </Auth>
        </main>
      </body>
    </html>
  );
}