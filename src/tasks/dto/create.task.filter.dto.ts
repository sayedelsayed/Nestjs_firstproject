import { IsOptional,IsEnum, IsString } from "class-validator";
import { TaskStatus } from "../task.status.eum";

export class GetTaskFilterDto{
    @IsOptional()
    @IsEnum(TaskStatus)
    status?:TaskStatus;
    @IsOptional()
    @IsString()
    search?:string;
}