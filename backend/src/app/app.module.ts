import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { DatabaseModule } from "@/app/config/database/database.module";
import { HealthModule } from "@/app/http-api/health/health.module";
import { ResponseNormalizerModule } from "@/app/http-api/response-normalizer/response.normalizer.module";

import { LoggerModule } from "@/shared/logger/infrastructure/logger.module";

import { UrlsModule } from "@/contexts/urls/infrastructure/urls.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    LoggerModule,
    HealthModule,
    ResponseNormalizerModule,
    DatabaseModule,
    UrlsModule,
  ],
})
export class AppModule {}
