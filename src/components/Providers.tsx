'use client';

import React, { useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import i18n from '@/locales/i18n';
import { NotificationProvider } from '@/components/notification/NotificationProvider';
import {ProvidersProps} from "@/interfaces/providersProps";

export default function Providers({ children }: ProvidersProps) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <I18nextProvider i18n={i18n}>
                <NotificationProvider>{children}</NotificationProvider>
            </I18nextProvider>
            {/*Devtools*/}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}