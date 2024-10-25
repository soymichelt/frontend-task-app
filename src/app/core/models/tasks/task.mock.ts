import { faker } from '@faker-js/faker';

import { TaskModel } from './task.model';

export class TaskMock {
  private static TASK_MODEL = [
    'TODO',
    'IN_PROGRESS',
    'TEST',
    'ON_HOLD',
    'DONE',
  ];

  private static TASK_LEVEL = ['LOW', 'MEDIUM', 'HIGH'];

  public static buildTask(): TaskModel {
    const statusIndex = faker.number.int({ min: 0, max: 4 });
    const status = this.TASK_MODEL?.[statusIndex];

    const levelIndex = faker.number.int({ min: 0, max: 2 });
    const level = this.TASK_LEVEL?.[levelIndex];

    return {
      taskId: faker.string.uuid(),
      title: faker.lorem.paragraph({ min: 10, max: 80 }),
      description: faker.lorem.paragraph({ min: 10, max: 200 }),
      deadline: faker.date.anytime().toISOString(),
      status,
      level,
      createdAt: faker.date.anytime().toISOString(),
      updatedAt: faker.date.anytime().toISOString(),
    };
  }

  public static buildTaskList(count: number = 3): TaskModel[] {
    const result: TaskModel[] = [];
    for (let i = 0; i <= count; i += 1) {
      const taskMock = this.buildTask();
      result.push(taskMock);
    }

    return result;
  }
}
