import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'soZando - Solola liboso, mbongo sima',
  description: 'Marketplace Lingala-first pour le Congo. Acheter, vendre, discuter. Discussion d\'abord, paiement après.',
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ln">
      <body className="bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
