import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { get } from 'http';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import{GetTaskFilterDto}from'./dto/create.task.filter.dto'
import { UpdatedTaskDto } from './dto/update-task-status.dto';
@Controller('tasks')
export class TasksController {
    constructor(private tasksService:TasksService){  }

    @Get()
    getTasks(@Query()filterDto:GetTaskFilterDto):Task[]{
        //if we have any filters defined ,call taskservice.getTaskwithFilters
        return this.tasksService.getTAskWithFilter(filterDto);
        //otherwise,just get all tasks

        if(Object.keys(filterDto).length)
            {}
        else{return this.tasksService.getAllTasks()}
        
    }
    @Get('/:id')
    getTaskById(@Param('id')id:string):Task{
        return this.tasksService.getTasksById(id)
    }
    @Post()
    createTask(
     @Body() createTaskDto:CreateTaskDto
    //  @Body('title') title:string,@Body('description') description:string 
    ):Task{
      return this.tasksService.createTask(createTaskDto);

    }
    @Delete('/:id')
    deletTask(@Param('id')id:string):void{
        return this.tasksService.DeleteById(id);
    }
    @Patch('/:id/status')
    updateTaskStatud(@Param('id') id:string,
                      @Body()updatedTaskDto:UpdatedTaskDto  ):Task{
                        const{status}=updatedTaskDto;
                        return this.tasksService.UpdateTask(id,status);
        


    }
}
