import { Module } from "@nestjs/common";

import { DatabaseModule } from "@/app/config/database/database.module";

import { CreateUrlUseCase } from "@/contexts/urls/application/create-url-use-case/create-url-use-case.service";
import { UrlRepository } from "@/contexts/urls/domain/url.repository";
import { CreateUrlController } from "@/contexts/urls/infrastructure/http-api/v1/create-url/create-url.controller";
import { PrismaUrlRepository } from "@/contexts/urls/infrastructure/repositories/prisma.url-repository";

@Module({
  imports: [DatabaseModule],
  controllers: [CreateUrlController],
  providers: [
    CreateUrlUseCase,
    PrismaUrlRepository,
    {
      provide: UrlRepository,
      useExisting: PrismaUrlRepository,
    },
  ],
  exports: [CreateUrlUseCase],
})
export class UrlsModule {}
