import { IsString } from 'class-validator';

export class CreateUrlDto {
  @IsString()
  originalUrl: string;
}
