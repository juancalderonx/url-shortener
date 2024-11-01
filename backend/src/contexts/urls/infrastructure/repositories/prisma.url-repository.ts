import { PrismaService } from "@/app/config/database/prisma.service";

import { Injectable } from "@/shared/dependency-injection/injectable";

import { PrimitiveUrl, Url } from "@/contexts/urls/domain/url.entity";
import { UrlRepository } from "@/contexts/urls/domain/url.repository";

@Injectable()
export class PrismaUrlRepository extends UrlRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async save(url: Url): Promise<void> {
    const primitiveUrl: PrimitiveUrl = url.toPrimitive();

    await this.prisma.url.create({
      data: {
        id: primitiveUrl.id,
        originalUrl: primitiveUrl.originalUrl,
        shortUrl: primitiveUrl.shortUrl,
        userId: primitiveUrl.userId,
        createdAt: primitiveUrl.createdAt,
        expiresAt: primitiveUrl.expiresAt,
      },
    });
  }

  async findByShortUrl(shortUrl: string): Promise<Url | null> {
    const url = await this.prisma.url.findUnique({
      where: {
        shortUrl,
      },
    });

    if (!url) return null;

    return new Url({
      id: url.id,
      originalUrl: url.originalUrl,
      shortUrl: url.shortUrl,
      userId: url.userId,
      createdAt: url.createdAt,
      updatedAt: url.updatedAt,
      expiresAt: url.expiresAt,
    });
  }

  async findAll(paginationDto: {
    page: number;
    limit: number;
  }): Promise<Url[] | null> {
    const { page, limit } = paginationDto;
    const ONE = 1;

    try {
      const urls = await this.prisma.url.findMany({
        skip: (page - ONE) * limit,
        take: limit,
      });

      return urls.map(url => {
        return new Url({
          id: url.id,
          originalUrl: url.originalUrl,
          shortUrl: url.shortUrl,
          userId: url.userId,
          createdAt: url.createdAt,
          updatedAt: url.updatedAt,
          expiresAt: url.expiresAt,
        });
      });
    } catch {
      return null;
    }
  }
}
