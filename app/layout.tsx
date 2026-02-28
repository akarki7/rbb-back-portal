import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rastriya Banijya Bank — Nepal\'s Trusted Bank',
  description: 'Rastriya Banijya Bank (RBB) — Nepal\'s government-owned commercial bank serving millions since 1966.',
  icons: {
    icon: 'https://www.rbb.com.np/uploads/config/1731390437-339067.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
