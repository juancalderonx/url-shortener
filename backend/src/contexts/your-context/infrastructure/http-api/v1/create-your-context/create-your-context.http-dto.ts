import { IsNotEmpty, IsString } from "class-validator";

export class CreateYourContextHttpDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
}
