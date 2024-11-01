import { Module } from "@nestjs/common";

import { DatabaseModule } from "@/app/config/database/database.module";

import { CreateUrlUseCase } from "@/contexts/urls/application/create-url-use-case/create-url.use-case";
import { FindAllUrlsUseCase } from "@/contexts/urls/application/find-all-urls-use-case/find-all-urls.use-case";
import { UrlRepository } from "@/contexts/urls/domain/url.repository";
import { CreateUrlController } from "@/contexts/urls/infrastructure/http-api/v1/create-url/create-url.controller";
import { FindAllUrlsController } from "@/contexts/urls/infrastructure/http-api/v1/find-all-urls/find-all-urls.controller";
import { PrismaUrlRepository } from "@/contexts/urls/infrastructure/repositories/prisma.url-repository";

@Module({
  imports: [DatabaseModule],
  controllers: [CreateUrlController, FindAllUrlsController],
  providers: [
    CreateUrlUseCase,
    FindAllUrlsUseCase,
    PrismaUrlRepository,
    {
      provide: UrlRepository,
      useExisting: PrismaUrlRepository,
    },
  ],
  exports: [CreateUrlUseCase],
})
export class UrlsModule {}
