import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Todo {
  @ApiProperty({
    example: 'b9d3c73a-5c15-42f7-9c33-3a2f65db88c9',
    description: 'The unique identifier of the todo',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Buy groceries',
    description: 'The title of the todo item',
  })
  @Column()
  title: string;

  @ApiProperty({
    example: false,
    description: 'The completion status of the todo item',
  })
  @Column()
  isCompleted: boolean;

  @ApiProperty({
    example: '2024-11-23T12:34:56Z',
    description: 'The date when the todo was created',
  })
  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: '2024-11-23T15:00:00Z',
    description: 'The date when the todo was last updated',
  })
  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
