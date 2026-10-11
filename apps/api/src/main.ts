import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';
import { AllExceptionFilter } from './common/filters/all-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  // 1. Cài đặt Pino Logger làm logger chính của ứng dụng
  app.useLogger(app.get(Logger));

  // 2. Bảo mật HTTP headers
  app.use(helmet());

  // 3. Cấu hình CORS Dynamic
  app.enableCors({
    origin: (origin, callback) => {
      // Trong môi trường production, bạn có thể kiểm tra origin từ database của Tenant
      // Ở đây ta tạm thời cho phép mọi origin hoặc cấu hình mảng cố định
      callback(null, true); 
    },
    credentials: true,
  });

  // 4. Kích hoạt ValidationPipe toàn cục để lọc và kiểm tra kiểu dữ liệu DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Kích hoạt Filter lỗi và Interceptor phản hồi thành công toàn cục
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  // 5. Cấu hình Swagger UI (OpenAPI Specification) cho hệ thống Enterprise
  const config = new DocumentBuilder()
    .setTitle('DIGVOS - API Specification')
    .setDescription('Tài liệu đặc tả các API Endpoints thuộc hệ điều hành quản lý năng lực số DIGVOS')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('identity', 'Quản lý danh tính và xác thực người dùng')
    .addTag('tenant', 'Quản lý tổ chức và phân tách dữ liệu SaaS')
    .addTag('competency', 'Quản lý khung năng lực số DigComp 3.0')
    .addTag('assessment', 'Động cơ thi và đánh giá thích ứng CAT/IRT')
    .addTag('evidence', 'Quản lý, nộp bài và chấm duyệt hồ sơ minh chứng học tập')
    .addTag('notification', 'Quản lý thông báo người dùng')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`[DIGVOS API] Backend running on: http://localhost:${port}`);
  console.log(`[DIGVOS API] Swagger UI available on: http://localhost:${port}/api/docs`);
}
bootstrap();
