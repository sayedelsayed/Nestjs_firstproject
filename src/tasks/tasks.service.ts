import { Injectable, NotFoundException, Search } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import{v4}from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import{GetTaskFilterDto}from'./dto/create.task.filter.dto';

@Injectable()
export class TasksService {
    private tasks:Task[]=[];
    getAllTasks():Task[]{
        return this.tasks
    }

    getTAskWithFilter(filterDto:GetTaskFilterDto):Task[]{
        const {status,search}=filterDto;
        //define a temporormy array
        let tasks=this.getAllTasks();
        //do something with status
        if(status)
        {
            tasks=tasks.filter((task)=>task.status===status)

        }
        if(search)
            {
                tasks=tasks.filter((task)=>{
                    if(task.title.includes(search)|| task.description.includes(search))
                        {
                            return true ;
                        }
                        return false ;
                })

            }

        return tasks;
    }
    getTasksById(id:string):Task{
        const found= this.tasks.find((task)=>task.id===id);
        if(!found)
            {
                throw new NotFoundException();
            }
        else{return found}
    }

    DeleteById(id:string):void{
        const found=this.getTasksById(id);

        this.tasks=this.tasks.filter((task)=>task.id !==found.id);
    }

    UpdateTask(id:string,status:TaskStatus){
        const task=this.getTasksById(id);
        task.status=status;
        return task
    }

    createTask(createTaskDto:CreateTaskDto):Task{
        const{title , description,}=createTaskDto
const task:Task={
    id:v4(),
    title, 
    description,
    status: TaskStatus.OPEN
}
this.tasks.push(task);
return task;
    }

}
