import { Body, Controller, Get, Post } from "@nestjs/common";

import { CreateYourContextUseCase } from "@/contexts/your-context/application/create-your-context-use-case/create-your-context.use-case";
import { PrimitiveYourContext } from "@/contexts/your-context/domain/your-context.entity";
import { V1_YOUR_CONTEXT } from "@/contexts/your-context/infrastructure/http-api/route.constants";
import { CreateYourContextHttpDto } from "@/contexts/your-context/infrastructure/http-api/v1/create-your-context/create-your-context.http-dto";

@Controller(V1_YOUR_CONTEXT)
export class CreateYourContextController {
  constructor(
    private readonly createYourContextUseCase: CreateYourContextUseCase,
  ) {}

  @Post()
  async run(
    @Body() createYourContextHttpDto: CreateYourContextHttpDto,
  ): Promise<{ payment: PrimitiveYourContext }> {
    return await this.createYourContextUseCase.run(createYourContextHttpDto);
  }

  @Get()
  run2() {
    return { yourContext: "ok" };
  }
}
