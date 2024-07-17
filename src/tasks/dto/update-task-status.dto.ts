import { IsEnum } from "class-validator";
import { TaskStatus } from "../task.model";

export class UpdatedTaskDto{
    
    @IsEnum(TaskStatus)
    status:TaskStatus;
}