import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { HealthModule } from "@/app/http-api/health/health.module";
import { ResponseNormalizerModule } from "@/app/http-api/response-normalizer/response.normalizer.module";

import { LoggerModule } from "@/shared/logger/infrastructure/logger.module";

import { YourContextModule } from "@/contexts/your-context/infrastructure/your-context.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    LoggerModule,
    HealthModule,
    ResponseNormalizerModule,
    YourContextModule,
  ],
})
export class AppModule {}
