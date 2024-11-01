import { Transform, Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  @Transform(({ value }) => Number.parseInt(value as string))
  page: number = 1;

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  @Transform(({ value }) => Number.parseInt(value as string))
  limit: number = 10;
}
