'use client';

import { I18nextProvider } from 'react-i18next';
import i18n from '@/locales/i18n';
import { NotificationProvider } from '@/providers/NotificationProvider';
import { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <I18nextProvider i18n={i18n}>
      <NotificationProvider>{children}</NotificationProvider>
    </I18nextProvider>
  );
}
