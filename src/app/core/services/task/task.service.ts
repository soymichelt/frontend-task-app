import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { SuccessResultModel } from '../../models/result/success-result.model';
import { TaskResultModel } from '../../models/tasks/task.model';
import { TaskUpdateModel } from '../../models/tasks/task-update.model';
import { TasksResultModel } from '../../models/tasks/tasks.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private API_URL = `${environment.apiUrl}/tasks`;

  constructor(private readonly httpClient: HttpClient) {}

  public getTasks(): Observable<TasksResultModel> {
    return this.httpClient.get<TasksResultModel>(this.API_URL);
  }

  public createTask(task: TaskUpdateModel): Observable<TaskResultModel> {
    return this.httpClient.post<TaskResultModel>(this.API_URL, task);
  }

  public updateTask(
    taskId: string,
    task: TaskUpdateModel,
  ): Observable<TaskResultModel> {
    return this.httpClient.patch<TaskResultModel>(
      `${this.API_URL}/${taskId}`,
      task,
    );
  }

  public updateStatusTask(
    taskId: string,
    status: string,
  ): Observable<TaskResultModel> {
    return this.httpClient.patch<TaskResultModel>(
      `${this.API_URL}/${taskId}/status`,
      {
        status,
      },
    );
  }

  public deleteTask(
    taskId: string,
  ): Observable<Omit<SuccessResultModel, 'body'>> {
    return this.httpClient.delete<Omit<SuccessResultModel, 'body'>>(
      `${this.API_URL}/${taskId}`,
    );
  }
}
