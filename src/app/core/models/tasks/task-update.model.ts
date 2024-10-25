/* eslint-disable @typescript-eslint/indent */
import { TaskModel } from './task.model';

export type TaskUpdateModel = Omit<
  TaskModel,
  'taskId' | 'createdAt' | 'updatedAt'
>;
