import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Cat } from '../cats.schema';

export class ReadOnlyDto extends PickType(Cat, ['email', 'name'] as const) {
  @ApiProperty({
    example: '505942',
    description: 'id',
  })
  id: string;
}
