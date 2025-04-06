import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UUIDIdDto {
  @ApiProperty()
  @IsUUID()
  id: string;
}
