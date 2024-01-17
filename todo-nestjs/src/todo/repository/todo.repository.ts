import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTodoDto } from '../dto/create-todo.dto'
import { UpdateTodoDto } from '../dto/update-todo.dto'

@Injectable()
export class TodoRepository {
  constructor(private readonly prisma: PrismaService) {}

 
  async findAll(){
    return await this.prisma.todo.findMany()
  }

  async findById(id: bigint) {
    return await this.prisma.todo.findFirstOrThrow({
      where: { id },
    });
  }

  async create(createTodoDTO: CreateTodoDto) {
    return await this.prisma.todo.create({ data: createTodoDTO});
  }

  async update(id: bigint, updateTodoDTO: UpdateTodoDto) {
    return await this.prisma.todo.update({
      where: { id },
      data: updateTodoDTO,
    });
  }

  async remove(id: bigint) {
   
    const task = await this.prisma.todo.delete({
      where: { id },
    });
    return task
  
  }
}