import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import { environment } from '../../../environments/environment';
import { TasksResultModel } from '../../models/tasks/tasks.model';
import { TaskMock } from '../../models/tasks/task.mock';
import { SuccessResultModel } from '../../models/result/success-result.model';
import { TaskUpdateModel } from '../../models/tasks/task-update.model';
import { TaskResultModel } from '../../models/tasks/task.model';

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
      body: TaskMock.buildTaskList(5),
    };

    taskService.getTasks().subscribe((tasks) => {
      expect(tasks).toEqual(mockTasks);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/tasks`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockTasks);
  });

  it('Should create a new task', () => {
    const taskCreated: TaskResultModel = {
      statusCode: 200,
      body: TaskMock.buildTask(),
    };
    const newTask: TaskUpdateModel = {
      title: taskCreated.body.title,
      description: taskCreated.body.description,
      deadline: taskCreated.body.deadline,
      level: taskCreated.body.level,
      status: taskCreated.body.status,
    };

    taskService.createTask(newTask).subscribe((task) => {
      expect(task).toEqual(taskCreated);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/tasks`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(newTask);
    req.flush(taskCreated);
  });

  it('Should update status task', () => {
    const taskStatusUpdated: TaskResultModel = {
      statusCode: 200,
      body: TaskMock.buildTask(),
    };

    taskService
      .updateStatusTask(taskStatusUpdated.body.taskId, 'TODO')
      .subscribe((task) => {
        expect(task).toEqual(taskStatusUpdated);
      });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/tasks/${taskStatusUpdated.body.taskId}/status`,
    );
    expect(req.request.method).toEqual('PATCH');
    expect(req.request.body).toEqual({ status: 'TODO' });
    req.flush(taskStatusUpdated);
  });

  it('Should delete a task', () => {
    const taskId = '123';
    const successResponse: Omit<SuccessResultModel, 'body'> = {
      statusCode: 200,
    };

    taskService.deleteTask(taskId).subscribe((response) => {
      expect(response).toEqual(successResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/tasks/${taskId}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush(successResponse);
  });
});

