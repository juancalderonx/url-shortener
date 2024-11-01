export interface CreateUrlDto {
  originalUrl: string;
  userId?: string;
  expiresAt?: Date;
}
