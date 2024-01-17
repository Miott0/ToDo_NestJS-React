import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { TodoRepository } from './repository/todo.repository';

@Module({
  controllers: [TodoController],
  providers: [TodoService, PrismaService, TodoRepository],
})
export class TodoModule {}
