import './globals.css';
import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="bg-[#f7f6f4]">
      <body className="min-h-screen bg-[#f7f6f4] text-[#1f1f1f] antialiased">
        {children}
      </body>
    </html>
  );
}
