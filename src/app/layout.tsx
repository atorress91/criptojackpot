import '@/../node_modules/react-modal-video/scss/modal-video.scss';
import Bootstrap from '@/components/Bootstrap';
import Cursor from '@/components/Cursor';

import type { Metadata } from 'next';
import 'swiper/css';
import '../styles/scss/style.scss';
import { NotificationProvider } from '@/providers/NotificationProvider';

export const metadata: Metadata = {
  title: 'Lottovibe - Lottery & Giveaway NextJs Template',
  description: 'Lottery & Giveaway NextJs Template',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Bootstrap>
        <body>
          <NotificationProvider>
            <Cursor />
            {children}
          </NotificationProvider>
        </body>
      </Bootstrap>
    </html>
  );
}
