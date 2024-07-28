import { Injectable, NotFoundException } from '@nestjs/common';
import {  TaskStatus } from './task.status.eum';
import { CreateTaskDto } from './dto/create-task.dto';
import{GetTaskFilterDto}from'./dto/create.task.filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import {getConnection} from "typeorm"; 
import { User } from 'src/auth/user.entity';
@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(Task) 
        private taskRepository:TaskRepository){  } 

    
    async getTasks(filterDto:GetTaskFilterDto ,user:User):Promise<Task[]>{
  
 const query= this.taskRepository.createQueryBuilder('task');
 query.where({user});
 const {status,search}=filterDto;
 if(status){
    query.andWhere('task.status=:status',{status});
 }
 if(search){
    query.andWhere(('LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search) '),{search:`%${search}%`})
 }

  const tasks=await query.getMany();
 return tasks;     
}


async getTasksById(id:string,user:User) : Promise<Task>{
const found =await this.taskRepository.findOne({
           where: { id ,user}
    })
    if(!found)
        throw new NotFoundException(`Task with ID ${id} Not found`);

    return found;

}

  async  DeleteById(id:string,user:User):Promise<void> 
{
    const result=await this.taskRepository.delete({id,user});
    if(result.affected === 0){
        throw  new NotFoundException(`Task with ${id} not found`);
    }
}

     async UpdateTask(id:string,status:TaskStatus, user:User):Promise<Task> {
        const task= await this.getTasksById(id,user);
        task.status=status;
        await this.taskRepository.save(task);
        
        return task
    }

async createTask(createTaskDto:CreateTaskDto,user:User):Promise<Task>{
    const{title , description,}=createTaskDto
    const task =this.taskRepository.create({
      title, 
      description, 
      status: TaskStatus.OPEN,
    user
} )
      await this.taskRepository.save(task)
      return task
};



}
