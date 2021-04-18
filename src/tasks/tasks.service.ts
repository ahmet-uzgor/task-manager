import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid'
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getTaskById(id: string): Task {
    const task = this.tasks.find(data => data.id === id);

    if (!task) {
      throw new NotFoundException(`Task with given ${id} ID is not found`)
    }
    return task
  }

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilter(filterDto: GetTaskFilterDto): Task[] {
    const { status, searchTerm } = filterDto;
    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter(data => data.status === status)
    }

    if (searchTerm) {
      tasks = tasks.filter(data => data.title.includes(searchTerm) || data.description.includes(searchTerm))
    }
    return tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto

    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN
    }

    this.tasks.push(task)
    return task;
  }

  deleteTaskById(id: string): Boolean {
    this.tasks = this.tasks.filter(data => data.id !== id);
    return true;
  }

  updateTaskById(id: string, status: TaskStatus): Task {
    let task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
