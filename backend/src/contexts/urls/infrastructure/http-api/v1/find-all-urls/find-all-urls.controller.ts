import { Controller, Get, Query } from "@nestjs/common";

import { PaginationDto } from "@/shared/dto/pagination.dto";

import { FindAllUrlsUseCase } from "@/contexts/urls/application/find-all-urls-use-case/find-all-urls.use-case";
import { PrimitiveUrl } from "@/contexts/urls/domain/url.entity";
import { V1_URLS } from "@/contexts/urls/infrastructure/http-api/route.constants";

@Controller(V1_URLS)
export class FindAllUrlsController {
  constructor(private readonly findAllUrlsUseCase: FindAllUrlsUseCase) {}

  @Get()
  async run(
    @Query() paginationDto: PaginationDto,
  ): Promise<{ urls: PrimitiveUrl[] }> {
    return await this.findAllUrlsUseCase.run(paginationDto);
  }
}
