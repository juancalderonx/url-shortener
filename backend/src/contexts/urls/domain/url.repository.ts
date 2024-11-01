import { Url } from "@/contexts/urls/domain/url.entity";

export abstract class UrlRepository {
  abstract save(url: Url): Promise<void>;
  abstract findByShortUrl(shortUrl: string): Promise<Url | null>;
}
