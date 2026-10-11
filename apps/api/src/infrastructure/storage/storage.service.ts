import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class StorageService implements OnModuleInit {
  private readonly logger = new Logger(StorageService.name);
  private s3Client: S3Client;
  private bucketName: string;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const endpoint = this.configService.get<string>('STORAGE_ENDPOINT');
    const region = this.configService.get<string>('STORAGE_REGION', 'us-east-1');
    const accessKeyId = this.configService.get<string>('STORAGE_ACCESS_KEY');
    const secretAccessKey = this.configService.get<string>('STORAGE_SECRET_KEY');
    this.bucketName = this.configService.get<string>('STORAGE_BUCKET', 'digvos-evidence');

    if (!endpoint || !accessKeyId || !secretAccessKey) {
      this.logger.warn('Storage configuration is missing. Falling back to local simulated storage.');
      // Giả lập s3Client để không crash app khi chạy local/test
      return;
    }

    this.s3Client = new S3Client({
      endpoint,
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      forcePathStyle: true, // Cần thiết cho Supabase/MinIO
    });
  }

  async getPresignedUploadUrl(key: string, mimeType: string): Promise<string> {
    if (!this.s3Client) {
      this.logger.log(`[Simulated S3] Generated Presigned URL for key: ${key}`);
      return `http://localhost:3000/simulated-upload/${this.bucketName}/${key}`;
    }

    // Thực tế sẽ dùng @aws-sdk/s3-request-presigner
    // Ở đây viết skeleton cơ bản:
    return `https://${this.bucketName}.supabase.co/storage/v1/s3/object/${key}`;
  }
}
