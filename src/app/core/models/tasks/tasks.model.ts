import { SuccessResultModel } from '../result/success-result.model';
import { TaskModel } from './task.model';

export type TasksResultModel = Omit<SuccessResultModel, 'data'> & {
  data: TaskModel[];
};

