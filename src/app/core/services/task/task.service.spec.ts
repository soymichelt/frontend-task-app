import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import { environment } from '../../../environments/environment';
import { TasksResultModel } from '../../models/tasks/tasks.model';
import { TaskMock } from '../../models/tasks/task.mock';
import { TaskModel, TaskResultModel } from '../../models/tasks/task.model';
import { SuccessResultModel } from '../../models/result/success-result.model';
import { TaskUpdateModel } from '../../models/tasks/task-update.model';

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
    const taskCreated: TaskResultModel = {
      statusCode: 200,
      data: TaskMock.buildTask(),
    };
    const newTask: TaskUpdateModel = {
      title: taskCreated.data.title,
      description: taskCreated.data.description,
      deadline: taskCreated.data.deadline,
      level: taskCreated.data.level,
      status: taskCreated.data.status,
    };

    taskService.createTask(newTask).subscribe((task) => {
      expect(task).toEqual(taskCreated);
    });

    const req = httpMock.expectOne(environment.apiUrl);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(newTask);
    req.flush(taskCreated);
  });

  it('Should update task', () => {
    const taskUpdated: TaskResultModel = {
      statusCode: 200,
      data: TaskMock.buildTask(),
    };
    const taskToUpdate: TaskUpdateModel = {
      title: taskUpdated.data.title,
      description: taskUpdated.data.description,
      deadline: taskUpdated.data.deadline,
      level: taskUpdated.data.level,
      status: taskUpdated.data.status,
    };

    taskService
      .updateTask(taskUpdated.data.taskId, taskToUpdate)
      .subscribe((task) => {
        expect(task).toEqual(taskUpdated);
      });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/${taskUpdated.data.taskId}`,
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

