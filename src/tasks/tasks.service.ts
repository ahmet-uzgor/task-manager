import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task-entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) { }

  async getTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne(id)

    if (!task) {
      throw new NotFoundException(`Task with given ${id} ID is not found`)
    }
    return task
  }

  // getTaskById(id: string): Task {
  //   const task = this.tasks.find(data => data.id === id);

  //   if (!task) {
  //     throw new NotFoundException(`Task with given ${id} ID is not found`)
  //   }
  //   return task
  // }

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // getTasksWithFilter(filterDto: GetTaskFilterDto): Task[] {
  //   const { status, searchTerm } = filterDto;
  //   let tasks = this.getAllTasks();

  //   if (status) {
  //     tasks = tasks.filter(data => data.status === status)
  //   }

  //   if (searchTerm) {
  //     tasks = tasks.filter(data => data.title.includes(searchTerm) || data.description.includes(searchTerm))
  //   }
  //   return tasks;
  // }

  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto

  //   const task: Task = {
  //     id: uuidv4(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN
  //   }

  //   this.tasks.push(task)
  //   return task;
  // }

  // deleteTaskById(id: string): Boolean {
  //   this.getTaskById(id);
  //   this.tasks = this.tasks.filter(data => data.id !== id);
  //   return true;
  // }

  // updateTaskById(id: string, status: TaskStatus): Task {
  //   let task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
