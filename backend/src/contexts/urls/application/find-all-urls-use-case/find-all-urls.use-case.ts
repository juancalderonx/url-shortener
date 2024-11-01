import { Injectable } from "@/shared/dependency-injection/injectable";
import { PaginationDto } from "@/shared/dto/pagination.dto";

import { PrimitiveUrl, Url } from "@/contexts/urls/domain/url.entity";
import { UrlRepository } from "@/contexts/urls/domain/url.repository";

@Injectable()
export class FindAllUrlsUseCase {
  constructor(private readonly urlRepository: UrlRepository) {}

  async run(paginationDto: PaginationDto): Promise<{ urls: PrimitiveUrl[] }> {
    const urls = await this.urlRepository.findAll(paginationDto);

    if (!urls) {
      return { urls: [] };
    }

    return { urls: urls.map((url: Url) => url.toPrimitive()) };
  }
}
