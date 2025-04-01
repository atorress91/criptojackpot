'use client'

import { S3Client } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import axios from 'axios';

interface UploadResponse {
  url: string;
  fileName: string;
  cdnUrl: string;
}

export class DigitalOceanStorageService {
  private static readonly CDN_ENDPOINT = 'https://cryptojackpot.nyc3.cdn.digitaloceanspaces.com';
  private static readonly ORIGIN_ENDPOINT = 'https://cryptojackpot.nyc3.digitaloceanspaces.com';
  private static readonly BUCKET_NAME = 'cryptojackpot';

  private static readonly s3Client = new S3Client({
    endpoint: 'https://nyc3.digitaloceanspaces.com',
    region: 'nyc3',
    credentials: {
      accessKeyId: 'DO801T9NJ6E98L2XBNNE',
      secretAccessKey: 'JMXZuQO4hSJCrHtMXZS6XkIaK22vQtoOmw5DSZQMv9Q'
    }
  });

  static async uploadFile(file: File, path: string): Promise<UploadResponse> {
    try {
      if (!file.type.startsWith('image/')) {
        throw new Error('Solo se permiten archivos de imagen');
      }

      const timestamp = new Date().getTime();
      const fileName = `${timestamp}-${file.name}`;
      const filePath = `${path}/${fileName}`;

      try {
        const { url, fields } = await createPresignedPost(this.s3Client, {
          Bucket: this.BUCKET_NAME,
          Key: filePath,
          Conditions: [
            ['content-length-range', 0, 10485760],
            ['starts-with', '$Content-Type', 'image/'],
          ],
          Fields: {
            'Content-Type': file.type,
          },
          Expires: 600,
        });

        const formData = new FormData();
        Object.entries(fields).forEach(([key, value]) => {
          formData.append(key, value);
        });
        formData.append('file', file);

        await axios.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          timeout: 60000,
        });

        const cdnUrl = `${this.CDN_ENDPOINT}/${fileName}`;

        return {
          url: `${this.ORIGIN_ENDPOINT}/${fileName}`,
          fileName,
          cdnUrl,
        };
      } catch (error) {
        console.error('Error al obtener URL firmada o subir archivo:', error);
        throw new Error('Error al subir el archivo a Digital Ocean');
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Error desconocido al subir el archivo');
    }
  }

  static async uploadMultipleFiles(files: File[], path: string): Promise<UploadResponse[]> {
    try {
      const uploadPromises = files.map(file => this.uploadFile(file, path));
      return await Promise.all(uploadPromises);
    } catch (error) {
      console.error('Error en uploadMultipleFiles:', error);
      throw error;
    }
  }

  static getFileUrl(fileName: string, useCdn: boolean = true): string {
    const baseUrl = useCdn ? this.CDN_ENDPOINT : this.ORIGIN_ENDPOINT;
    return `${baseUrl}/${fileName}`;
  }
}