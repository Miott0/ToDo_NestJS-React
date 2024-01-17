import { IsString } from 'class-validator';

export class CreateTodoDto {

    @IsString({ message: 'O nome precisa ser uma string.' })
    name: string;

    completed: boolean;
}
