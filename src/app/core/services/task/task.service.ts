import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TasksResultModel } from '../../models/tasks/tasks.model';
import { environment } from '../../../environments/environment';
import { TaskResultModel } from '../../models/tasks/task.model';
import { SuccessResultModel } from '../../models/result/success-result.model';
import { TaskUpdateModel } from '../../models/tasks/task-update.model';

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

  public deleteTask(
    taskId: string,
  ): Observable<Omit<SuccessResultModel, 'data'>> {
    return this.httpClient.delete<Omit<SuccessResultModel, 'data'>>(
      `${this.API_URL}/${taskId}`,
    );
  }
}

