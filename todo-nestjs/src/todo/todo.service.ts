import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoRepository } from './repository/todo.repository';

@Injectable()
export class TodoService {

  constructor(private readonly repository: TodoRepository) {}

  async findAll() {
    return await this.repository.findAll();
  }

  async findById(id: bigint) {
    return await this.repository.findById(id);
  }

  async create(createTodoDto: CreateTodoDto) {
    return await this.repository.create(createTodoDto);
  }

  async update(id: bigint, updateTodoDto: UpdateTodoDto) {
    return await this.repository.update(id, updateTodoDto);
  }

  async remove(id: bigint) {
    return await this.repository.remove(id);
  }
}
