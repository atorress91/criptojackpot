import React from "react";
import {StaticImageData} from "next/image";

export type ProfileImageType = StaticImageData | string;

export interface UseProfilePhotoReturn {
    profileImage: ProfileImageType;
    uploading: boolean;
    uploadError: string | null;
    fileInputRef: React.RefObject<HTMLInputElement>;
    handleFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
    openFileSelector: () => void;
    clearError: () => void;
    resetToDefault: () => void;
}

export interface UseProfilePhotoOptions {
    defaultImage?: ProfileImageType;
    maxFileSize?: number;
    allowedTypes?: string[];
    onUploadStart?: () => void;
    onUploadSuccess?: (url: string) => void;
    onUploadError?: (error: string) => void;
}