export type GroupKey = 'TODO' | 'IN_PROGRESS' | 'TEST' | 'ON_HOLD' | 'DONE';
export type Level = 'LOW' | 'MEDIUM' | 'HIGH';

export type GroupType = {
  key: GroupKey;
  label: string;
};

export type TaskGroupList = {
  TODO: TaskItem[];
  IN_PROGRESS: TaskItem[];
  TEST: TaskItem[];
  ON_HOLD: TaskItem[];
  DONE: TaskItem[];
};

export type TaskItem = {
  taskId: string;
  title: string;
  description: string;
  status: GroupKey;
  level: Level;
  deadline: string;
  createdAt: string;
};
