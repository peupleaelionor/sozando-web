import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'soZando - Solola liboso, mbongo sima',
  description: 'Marketplace Lingala-first pour le Congo',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ln">
      <body>{children}</body>
    </html>
  );
}
