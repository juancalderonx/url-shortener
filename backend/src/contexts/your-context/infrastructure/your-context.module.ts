import { Module } from "@nestjs/common";

import { CreateYourContextUseCase } from "@/contexts/your-context/application/create-your-context-use-case/create-your-context.use-case";
import { YourContextRepository } from "@/contexts/your-context/domain/your-context.repository";
import { CreateYourContextController } from "@/contexts/your-context/infrastructure/http-api/v1/create-your-context/create-your-context.controller";
import { InMemoryYourContextRepository } from "@/contexts/your-context/infrastructure/repositories/in-memory.your-context-repository";

@Module({
  controllers: [CreateYourContextController],
  providers: [
    CreateYourContextUseCase,
    InMemoryYourContextRepository,
    {
      provide: YourContextRepository,
      useExisting: InMemoryYourContextRepository,
    },
  ],
  exports: [CreateYourContextUseCase],
})
export class YourContextModule {}
