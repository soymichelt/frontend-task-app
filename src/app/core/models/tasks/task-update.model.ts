import { TaskModel } from './task.model';

export type TaskUpdateModel = Omit<
TaskModel,
'taskId' | 'createdAt' | 'updatedAt'
>;
