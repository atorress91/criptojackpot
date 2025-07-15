'use client';

import {useMutation} from '@tanstack/react-query';
import {useRouter} from 'next/navigation';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';

import {authService} from '@/services/authService';
import {useAuthStore} from '@/store/authStore';
import {useNotificationStore} from '@/store/notificationStore';
import {AuthRequest, LoginFormData} from '@/features/auth/types';

export const useLoginForm = () => {
    const {t} = useTranslation();
    const router = useRouter();
    const showNotification = useNotificationStore(state => state.show);
    const setAuthData = useAuthStore(state => state.login);

    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
    });
    const [isPasswordShow, setIsPasswordShow] = useState(false);


    const loginMutation = useMutation({
        mutationFn: (credentials: AuthRequest) => authService.authenticate(credentials),
        onSuccess: data => {

            setAuthData(data);
            showNotification('success', t('LOGIN.success'), t('LOGIN.welcome'));

            if (data.role?.name === 'admin') {
                router.push('/admin');
            } else {
                router.push('/user-panel');
            }
        },
        onError: (error: any) => {
            const errorMessage = error?.response?.data?.message || t('LOGIN.errors.invalidCredentials');
            showNotification('error', t('LOGIN.errors.loginFailed'), errorMessage);
        },
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const togglePasswordVisibility = () => {
        setIsPasswordShow(prev => !prev);
    };

    const validateForm = (): boolean => {
        if (!formData.email || !formData.password) {
            showNotification('error', t('LOGIN.errors.invalidData'), t('LOGIN.errors.requiredFields'));
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showNotification('error', t('LOGIN.errors.invalidEmailFormat'), t('LOGIN.errors.invalidEmailFormat'));
            return false;
        }
        return true;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        loginMutation.mutate(formData);
    };

    return {
        formData,
        isPasswordShow,
        isLoading: loginMutation.isPending,
        error: loginMutation.error ? (loginMutation.error as any).response?.data?.message || 'Error' : null,
        handleInputChange,
        togglePasswordVisibility,
        handleSubmit,
    };
};