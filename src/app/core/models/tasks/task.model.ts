import { SuccessResultModel } from '../result/success-result.model';

export type TaskModel = {
  taskId: string;
  title: string;
  description: string;
  deadline: string;
  status: string;
  level: string;
  createdAt: string;
  updatedAt: string;
};

export type TaskResultModel = Omit<SuccessResultModel, 'body'> & {
  body: TaskModel;
};

