import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { allowedStatus } from "../pipes/task-status-pipe";
import { TaskStatus } from "../task.model";

export class GetTaskFilterDto {
    @IsOptional()
    @IsIn(allowedStatus)
    status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    searchTerm: string
}