import {
  HttpClientTestingModule,
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { of } from 'rxjs';

import { TaskService } from './task.service';
import { environment } from '../../../environments/environment';
import { TasksResultModel } from '../../models/tasks/tasks.model';
import { TaskMock } from '../../models/tasks/task.mock';
import { TaskModel, TaskResultModel } from '../../models/tasks/task.model';
import { SuccessResultModel } from '../../models/result/success-result.model';

describe('TaskService tests', () => {
  let taskService: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService],
    });

    taskService = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Should get tasks', () => {
    const mockTasks: TasksResultModel = {
      statusCode: 200,
      data: TaskMock.buildTaskList(5),
    };

    taskService.getTasks().subscribe((tasks) => {
      expect(tasks).toEqual(mockTasks);
    });

    const req = httpMock.expectOne(environment.apiUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(mockTasks);
  });

  it('Should create a new task', () => {
    const newTask: TaskModel = TaskMock.buildTask();
    const createdTask: TaskResultModel = {
      statusCode: 200,
      data: newTask,
    };

    taskService.createTask(newTask).subscribe((task) => {
      expect(task).toEqual(createdTask);
    });

    const req = httpMock.expectOne(environment.apiUrl);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(newTask);
    req.flush(createdTask);
  });

  it('Should update task', () => {
    const taskToUpdate: TaskModel = TaskMock.buildTask();
    const taskUpdated: TaskResultModel = {
      statusCode: 200,
      data: taskToUpdate,
    };

    taskService
      .updateTask(taskToUpdate.taskId, taskToUpdate)
      .subscribe((task) => {
        expect(task).toEqual(taskUpdated);
      });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/${taskToUpdate.taskId}`,
    );
    expect(req.request.method).toEqual('PATCH');
    expect(req.request.body).toEqual(taskToUpdate);
    req.flush(taskUpdated);
  });

  it('Should delete a task', () => {
    const taskId = '123';
    const successResponse: Omit<SuccessResultModel, 'data'> = {
      statusCode: 200,
    };

    taskService.deleteTask(taskId).subscribe((response) => {
      expect(response).toEqual(successResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/${taskId}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush(successResponse);
  });
});

