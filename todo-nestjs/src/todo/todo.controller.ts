import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async findAll() {
    const response = await this.todoService.findAll(); 
    const todos = response.map(todo => {
      const response = {
        id: Number(todo.id),
        name: todo.name,
        completed: todo.completed
      }
      
      return response;
    });
  
    return todos;
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const todoResponse = await this.todoService.findById(BigInt(id));

    const response = {
      id: Number(todoResponse.id),
      name: todoResponse.name,
      completed: todoResponse.completed
    }
    return response
  }

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    const todoResponse = await this.todoService.create(createTodoDto)

    const response = {
      id: Number(todoResponse.id),
      name: todoResponse.name,
      completed: todoResponse.completed
    }
    return response
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
   
    const todoResponse =  await this.todoService.update(BigInt(id), updateTodoDto);

    const response = {
      id: Number(todoResponse.id),
      name: todoResponse.name,
      completed: todoResponse.completed
    }
    return response
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const todoResponse = await this.todoService.remove(BigInt(id));
      
      if (!todoResponse) {
        return { message: "task não encontrada" };
      }
  
      const response = {
        id: Number(todoResponse.id),
        name: todoResponse.name,
        completed: todoResponse.completed,
        message: "delete successful"
      }
      return response;
    } catch (error) {
      console.log(error);
      return { message: "Ocorreu um erro ao tentar excluir a tarefa" };
    }
  }
  
}
