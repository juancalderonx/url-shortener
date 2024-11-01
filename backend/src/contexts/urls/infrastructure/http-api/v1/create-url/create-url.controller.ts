import { Body, Controller, Post } from "@nestjs/common";

import { CreateUrlUseCase } from "@/contexts/urls/application/create-url-use-case/create-url.use-case";
import { PrimitiveUrl } from "@/contexts/urls/domain/url.entity";
import { V1_URLS } from "@/contexts/urls/infrastructure/http-api/route.constants";
import { CreateUrlHttpDto } from "@/contexts/urls/infrastructure/http-api/v1/create-url/create-url.http-dto";

@Controller(V1_URLS)
export class CreateUrlController {
  constructor(private readonly createUrlUseCase: CreateUrlUseCase) {}

  @Post()
  async run(
    @Body() createUrlHttpDto: CreateUrlHttpDto,
  ): Promise<{ url: PrimitiveUrl }> {
    return await this.createUrlUseCase.run(createUrlHttpDto);
  }
}
