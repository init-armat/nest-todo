import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const newTodo = this.todoRepository.create(createTodoDto);
    return await this.todoRepository.save(newTodo);
  }

  async findAll(): Promise<Todo[]> {
    return await this.todoRepository.find();
  }

  async findOne(id: string): Promise<Todo> {
    return await this.getTodoById(id);
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const foundTodo = await this.getTodoById(id);
    const updatedTodo = this.todoRepository.merge(foundTodo, updateTodoDto);
    return await this.todoRepository.save(updatedTodo);
  }

  async remove(id: string): Promise<Todo> {
    const foundTodo = await this.getTodoById(id);
    await this.todoRepository.delete(id);
    return foundTodo;
  }

  private async getTodoById(id: string): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }
}
