import { IsEnum } from "class-validator";
import { TaskStatus } from "../task.status.eum";

export class UpdatedTaskDto{
    
    @IsEnum(TaskStatus)
    status:TaskStatus;
}