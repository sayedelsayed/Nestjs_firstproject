import {  EntityRepository, Repository } from "typeorm";
import { Task } from "./task.entity";
import { GetTaskFilterDto } from "./dto/create.task.filter.dto";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task.status.eum";
@EntityRepository(Task)
 export class TaskRepository extends Repository<Task> {
    async getTasks(filterDto:GetTaskFilterDto):Promise<Task[]>{
        const query= this.createQueryBuilder('task');
        const tasks=await query.getMany();
        return tasks;      
    }




    // async createTask(createTaskDto:CreateTaskDto):Promise<Task>{
    //     const{title , description,}=createTaskDto
    //     const task =this.create({
    //       title, 
    //       description, 
    //       status: TaskStatus.OPEN,} )
    //       await this.save(task)
    //       return task
    // };
    
    
 }