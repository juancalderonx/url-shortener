import { Module } from "@nestjs/common";

import { LoggerModule } from "@/shared/logger/infrastructure/logger.module";

import { HealthController } from "./health.controller";

@Module({
  imports: [LoggerModule],
  controllers: [HealthController],
})
export class HealthModule {}
