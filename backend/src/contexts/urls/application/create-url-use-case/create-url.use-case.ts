import { Injectable } from "@/shared/dependency-injection/injectable";

import { generateShortCode } from "@/contexts/urls/application/create-url-use-case/utils/generate-short-url";
import { PrimitiveUrl, Url } from "@/contexts/urls/domain/url.entity";
import { UrlRepository } from "@/contexts/urls/domain/url.repository";

import { CreateUrlDto } from "./create-url.dto";

@Injectable()
export class CreateUrlUseCase {
  constructor(private readonly urlRepository: UrlRepository) {}

  async run(dto: CreateUrlDto): Promise<{ url: PrimitiveUrl }> {
    const { originalUrl, userId, expiresAt } = dto;

    const shortUrl = await this.generateUniqueShortUrl();

    const url = Url.create({
      originalUrl,
      shortUrl,
      userId: userId || "",
      createdAt: new Date(),
      expiresAt: expiresAt
        ? new Date(expiresAt)
        : new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });

    await this.urlRepository.save(url);

    return { url: url.toPrimitive() };
  }

  private async generateUniqueShortUrl(): Promise<string> {
    let isUnique = false;
    let shortUrl: string;

    do {
      shortUrl = "https://short.url/" + generateShortCode();
      const existingUrl = await this.urlRepository.findByShortUrl(shortUrl);
      isUnique = !existingUrl;
    } while (!isUnique);

    return shortUrl;
  }
}
