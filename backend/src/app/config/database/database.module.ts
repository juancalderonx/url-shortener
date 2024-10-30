import { Module } from "@nestjs/common";

import { PrismaService } from "@/app/config/database/prisma.service";

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}
