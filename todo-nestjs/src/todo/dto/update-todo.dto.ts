import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {

    @IsNumber({}, { message: 'O id não pode ser vazio.' })
    @Type(() => Number)
    readonly id: bigint;
}
