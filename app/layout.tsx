import type { Metadata } from 'next';
import './globals.css';

import QueryProvider from '@/components/providers/QueryProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Box } from '@mui/material';

export const metadata: Metadata = {
  title: 'FakeShop - Buy Quality Products Online',
  description: 'Discover and shop for high-quality fake products at unbeatable prices. Browse our wide selection of premium items with fast shipping and excellent customer service.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Navbar />
              <Box component="main" sx={{ flexGrow: 1 }}>
                {children}
              </Box>
              <Footer />
            </Box>
        </QueryProvider>
      </body>
    </html>
  );
}
