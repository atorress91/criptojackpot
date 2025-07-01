import { BaseService } from './baseService';
import type { Response as ApiResponse } from '@/interfaces/response';

interface UploadRequest {
  fileName: string;
  contentType: string;
  expirationMinutes?: number;
  userId: number;
}

interface PresignedUrlResponse {
  url: string;
}

interface UploadResponse {
  fileName: string;
  fileUrl: string;
  cdnUrl: string;
}

export class DigitalOceanStorageService extends BaseService {
  protected endpoint: string = 'digitaloceanstorage';

  /**
   * Sube un archivo usando presigned URL del backend
   */
  async uploadFile(file: File, userId: number, path: string = 'uploads'): Promise<UploadResponse> {
    try {
      // Validación básica
      if (!file.type.startsWith('image/')) {
        throw new Error('Solo se permiten archivos de imagen');
      }

      if (file.size > 10 * 1024 * 1024) {
        // 10MB
        throw new Error('El archivo es demasiado grande (máximo 10MB)');
      }

      // Usar solo el nombre original - el backend generará el nombre único
      const originalFileName = file.name;

      // Solicitar presigned URL al backend (incluye userId)
      const presignedUrl = await this.getPresignedUploadUrl({
        fileName: originalFileName,
        contentType: file.type,
        expirationMinutes: 15,
        userId: userId,
      });

      // Subir archivo directamente a Digital Ocean
      await this.uploadToDigitalOcean(presignedUrl, file);

      // Construir URLs de respuesta
      const fileUrl = presignedUrl.split('?')[0]; // Remover query params
      const cdnUrl = fileUrl.replace(
        'cryptojackpot.nyc3.digitaloceanspaces.com',
        'cryptojackpot.nyc3.cdn.digitaloceanspaces.com'
      );

      // Extraer el fileName del presigned URL
      const fileName = fileUrl.split('/').slice(-2).join('/'); // profile-photos/user-123-...

      return {
        fileName,
        fileUrl,
        cdnUrl,
      };
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error instanceof Error ? error : new Error('Error desconocido al subir el archivo');
    }
  }

  /**
   * Sube múltiples archivos
   */
  async uploadMultipleFiles(files: File[], userId: number, path: string = 'uploads'): Promise<UploadResponse[]> {
    try {
      const uploadPromises = files.map(file => this.uploadFile(file, userId, path));
      return await Promise.all(uploadPromises);
    } catch (error) {
      console.error('Error en uploadMultipleFiles:', error);
      throw error;
    }
  }

  /**
   * Sube foto de perfil y actualiza en el backend
   */
  async uploadProfilePhoto(file: File, userId: number): Promise<string> {
    try {
      // Subir archivo con userId
      const { fileUrl } = await this.uploadFile(file, userId, 'profile-photos');
      return fileUrl;
    } catch (error) {
      throw error;
    }
  }
  /**
   * Obtener presigned URL del backend
   */
  async getPresignedUploadUrl(request: UploadRequest): Promise<string> {
    const response = await this.createWithParams<UploadRequest, string>(request, 'presign');

    return response;
  }

  /**
   * Subir archivo directamente a Digital Ocean usando presigned URL
   */
  private async uploadToDigitalOcean(presignedUrl: string, file: File): Promise<void> {
    try {
      const response = await fetch(presignedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error uploading to Digital Ocean:', error);
      throw new Error('Error al subir el archivo a Digital Ocean');
    }
  }

  /**
   * Construir URL del archivo (CDN o original)
   */
  static getFileUrl(fileName: string, useCdn: boolean = true): string {
    const baseUrl = useCdn
      ? 'https://cryptojackpot.nyc3.cdn.digitaloceanspaces.com'
      : 'https://cryptojackpot.nyc3.digitaloceanspaces.com';

    // Remover path duplicado si fileName ya incluye el path completo
    const cleanFileName = fileName.startsWith('http') ? fileName.split('/').pop() : fileName;
    return `${baseUrl}/${cleanFileName}`;
  }
}

export const digitalOceanStorageService = new DigitalOceanStorageService();
