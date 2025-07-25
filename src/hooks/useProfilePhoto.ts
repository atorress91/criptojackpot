import {UpdateImageProfileRequest} from '@/features/user-panel/types/updateImageProfileRequest';
import React, {useEffect, useRef, useState} from 'react';
import {useAuthStore} from '@/store/authStore';
import {digitalOceanStorageService} from '@/services/digitalOceanStorageService';
import {userService} from '@/services/userService';
import {ProfileImageType, UseProfilePhotoOptions, UseProfilePhotoReturn} from "@/interfaces/profilePhotoReturn";

export const useProfilePhoto = (options: UseProfilePhotoOptions = {}): UseProfilePhotoReturn => {
  const {
    defaultImage,
    maxFileSize = 10 * 1024 * 1024,
    allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
    onUploadStart,
    onUploadSuccess,
    onUploadError,
  } = options;

  const { user, updateUser } = useAuthStore();
  const [profileImage, setProfileImage] = useState<ProfileImageType>(defaultImage || '');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user?.imagePath) {
      setProfileImage(user.imagePath);
    } else if (defaultImage) {
      setProfileImage(defaultImage);
    }
  }, [user?.imagePath, defaultImage]);

  const validateFile = (file: File): string | null => {
    if (!allowedTypes.includes(file.type)) {
      return `Tipo de archivo no permitido. Tipos válidos: ${allowedTypes.join(', ')}`;
    }

    if (file.size > maxFileSize) {
      const maxSizeMB = Math.round(maxFileSize / (1024 * 1024));
      return `El archivo es demasiado grande (máximo ${maxSizeMB}MB)`;
    }

    return null;
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleProfilePhotoUpload(file).then();
    }
  };

  const handleProfilePhotoUpload = async (file: File) => {
    setUploadError(null);

    const validationError = validateFile(file);
    if (validationError) {
      setUploadError(validationError);
      onUploadError?.(validationError);
      return;
    }

    setUploading(true);
    onUploadStart?.();

    try {
      const uploadResult = await digitalOceanStorageService.uploadProfilePhoto(file, user?.id ?? 0);
      const url = new URL(uploadResult);
      const imageRelativePath = url.pathname.replace('/cryptojackpot/', '');

      if (user) {
        const updateImageProfile: UpdateImageProfileRequest = {
          userId: user.id ?? 0,
          imageUrl: imageRelativePath,
        };

        try {
          if (user?.id !== undefined) {
            const user = await userService.updateImageProfile(updateImageProfile);
            setProfileImage(user.imagePath ?? '');
            updateUser(user);
          }
        } catch (backendError) {
          console.warn('Error updating user profile in backend:', backendError);
        }
      }

      onUploadSuccess?.(uploadResult);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al subir la imagen';
      console.error('Error uploading profile photo:', error);
      setUploadError(errorMessage);
      onUploadError?.(errorMessage);
      setProfileImage(profileImage);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const openFileSelector = () => {
    if (!uploading) {
      fileInputRef.current?.click();
    }
  };

  const clearError = () => {
    setUploadError(null);
  };

  const resetToDefault = () => {
    if (defaultImage) {
      setProfileImage(defaultImage);
    }
    setUploadError(null);
  };

  return {
    profileImage,
    uploading,
    uploadError,
    fileInputRef,
    handleFileSelect,
    openFileSelector,
    clearError,
    resetToDefault,
  };
};
