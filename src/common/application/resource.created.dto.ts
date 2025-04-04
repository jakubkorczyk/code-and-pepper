import { IsUUID } from 'class-validator';

export class ResourceCreatedDto {
  @IsUUID()
  id: string;
}
