import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @ApiProperty({ required: false })
  title?: string;

  @ApiProperty({ required: false, default: false })
  isCompleted?: boolean;
}
