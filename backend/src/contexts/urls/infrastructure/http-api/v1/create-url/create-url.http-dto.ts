import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateUrlHttpDto {
  @IsString()
  @IsNotEmpty()
  originalUrl!: string;

  @IsUUID()
  userId!: string;
}
