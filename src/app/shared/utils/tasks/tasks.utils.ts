import { TasksResultModel } from '../../../core/models/tasks/tasks.model';
import {
  GroupKey,
  GroupType,
  Level,
  TaskGroupList,
  TaskItem,
} from '../../components/lists/lists.model';

export const groups: GroupType[] = [
  { key: 'TODO', label: 'To-Do' },
  { key: 'IN_PROGRESS', label: 'In Progress' },
  { key: 'TEST', label: 'Test' },
  { key: 'ON_HOLD', label: 'On Hold' },
  { key: 'DONE', label: 'Done' },
];

export const mapToTaskGroup = (tasks: TasksResultModel): TaskGroupList => {
  const result: TaskGroupList = {} as TaskGroupList;

  groups.forEach(({ key }) => {
    const tasksGroup =
      tasks.body
        .filter(({ status }) => status === key)
        .map(
          (task): TaskItem => ({
            taskId: task.taskId,
            title: task.title,
            description: task.description,
            deadline: task.deadline,
            status: task.status as GroupKey,
            level: task.level as Level,
            createdAt: task.createdAt,
          }),
        ) || [];

    result[key] = tasksGroup;
  });

  return result;
};

export const calculatePercentageTaskCompleted = (
  tasks: TasksResultModel,
): number | null => {
  const tasksCompleted =
    tasks.body?.filter(({ status }) => status === 'DONE').length || 0;
  const totalTasks = tasks.body?.length || 0;
  if (totalTasks === 0) return null;

  return parseFloat(((tasksCompleted * 100) / totalTasks).toFixed(2));
};
