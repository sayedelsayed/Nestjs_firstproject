import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { get } from 'http';
import {  TaskStatus } from './task.status.eum';
import { CreateTaskDto } from './dto/create-task.dto';
import{GetTaskFilterDto}from'./dto/create.task.filter.dto'
import { UpdatedTaskDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user-decorator';
import { User } from 'src/auth/user.entity';
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private tasksService:TasksService){  }

    @Get()
    getTasks(@Query()filterDto:GetTaskFilterDto,@GetUser() user:User):Promise<Task[]>{
        return this.tasksService.getTasks(filterDto,user);

    }

     @Post()
     createTask(
      @Body() createTaskDto:CreateTaskDto,@GetUser() user:User
       
    ):Promise<Task>{
       return this.tasksService.createTask(createTaskDto,user);

     }
    @Delete('/:id')
    deletTask(@Param('id')id:string,@GetUser() user:User):Promise<void>{
        return this.tasksService.DeleteById(id,user);
    }
    @Patch('/:id/status',)
    updateTaskStatud(@Param('id') id:string,
                      @Body()updatedTaskDto:UpdatedTaskDto,@GetUser() user:User  ):Promise<Task>{
                        const{status}=updatedTaskDto;
                        return this.tasksService.UpdateTask(id,status,user);
        


    }
              
    @Get('/:id')
    getTaskById(@Param('id')id:string,@GetUser() user:User):Promise<Task>{

        return this.tasksService.getTasksById(id,user);
    }
}
