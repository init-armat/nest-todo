import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @ApiResponse({
    status: 201,
    description: 'Successfully created',
    type: Todo,
  })
  @Post()
  async create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return await this.todoService.create(createTodoDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all todos',
    type: Todo,
    isArray: true,
  })
  @Get()
  async getAll(): Promise<Todo[]> {
    return await this.todoService.getAll();
  }

  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved todo',
    type: Todo,
  })
  @ApiResponse({
    status: 404,
    description: 'Todo not found',
  })
  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Todo> {
    return await this.todoService.getOne(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Successfully updated',
    type: Todo,
  })
  @ApiResponse({
    status: 404,
    description: 'Todo not found',
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    return await this.todoService.update(id, updateTodoDto);
  }

  @ApiResponse({
    status: 204,
    description: 'Successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Todo not found',
  })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Todo> {
    return await this.todoService.remove(id);
  }
}
