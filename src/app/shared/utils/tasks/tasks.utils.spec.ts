import { TasksResultModel } from '../../../core/models/tasks/tasks.model';
import { calculatePercentageTaskCompleted } from './tasks.utils';

describe('Tasks utils tests', () => {
  describe('calculatePercentageTaskCompleted tests', () => {
    const tasksMock1 = {
      statusCode: 200,
      body: [
        {
          taskId: '1ceb9855-39e5-48a6-8bec-19d63fbab5d9',
          title: 'Subir vídeo de POO a YouTube',
          description:
            'Es necesario grabar y editar el vídeo de programación orientada a objetos para posteriormente subirlo a YouTube.',
          deadline: '2024-10-25T06:00:00.000Z',
          status: 'TODO',
          level: 'MEDIUM',
          userId: '37c42eec-84db-428c-ad6e-9954ff3d6cc3',
          createdAt: '2024-10-24T15:58:40.804Z',
          updatedAt: '2024-10-24T15:58:40.804Z',
        },
        {
          taskId: '8462e440-8cd6-462f-8632-0bb7076ee3fb',
          title: 'Task 2',
          description: 'Reunión de amigos',
          deadline: '2024-10-19T19:19:54.945Z',
          status: 'TODO',
          level: 'HIGH',
          userId: '37c42eec-84db-428c-ad6e-9954ff3d6cc3',
          createdAt: '2024-10-19T19:19:54.945Z',
          updatedAt: '2024-10-19T19:19:54.945Z',
        },
        {
          taskId: '91f69c89-c099-421a-a939-1194759b3b8a',
          title: 'Tengo que ir al gym a partir de manana',
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown",
          deadline: '2024-10-21T18:26:08.396Z',
          status: 'TODO',
          level: 'MEDIUM',
          userId: '37c42eec-84db-428c-ad6e-9954ff3d6cc3',
          createdAt: '2024-10-24T16:44:19.254Z',
          updatedAt: '2024-10-24T16:44:19.254Z',
        },
        {
          taskId: '99b23ee4-44c0-4934-a899-b9bbcfe88cc4',
          title: 'Task 1',
          description: 'Ir al gym',
          deadline: '2024-10-19T18:53:58.166Z',
          status: 'TODO',
          level: 'MEDIUM',
          userId: '37c42eec-84db-428c-ad6e-9954ff3d6cc3',
          createdAt: '2024-10-19T18:53:58.166Z',
          updatedAt: '2024-10-19T18:53:58.166Z',
        },
      ],
    };

    const tasksMock2 = {
      statusCode: 200,
      body: [
        {
          taskId: '1ceb9855-39e5-48a6-8bec-19d63fbab5d9',
          title: 'Subir vídeo de POO a YouTube',
          description:
            'Es necesario grabar y editar el vídeo de programación orientada a objetos para posteriormente subirlo a YouTube.',
          deadline: '2024-10-25T06:00:00.000Z',
          status: 'TODO',
          level: 'MEDIUM',
          userId: '37c42eec-84db-428c-ad6e-9954ff3d6cc3',
          createdAt: '2024-10-24T15:58:40.804Z',
          updatedAt: '2024-10-24T15:58:40.804Z',
        },
        {
          taskId: '8462e440-8cd6-462f-8632-0bb7076ee3fb',
          title: 'Task 2',
          description: 'Reunión de amigos',
          deadline: '2024-10-19T19:19:54.945Z',
          status: 'TODO',
          level: 'HIGH',
          userId: '37c42eec-84db-428c-ad6e-9954ff3d6cc3',
          createdAt: '2024-10-19T19:19:54.945Z',
          updatedAt: '2024-10-19T19:19:54.945Z',
        },
        {
          taskId: '91f69c89-c099-421a-a939-1194759b3b8a',
          title: 'Tengo que ir al gym a partir de manana',
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown",
          deadline: '2024-10-21T18:26:08.396Z',
          status: 'TODO',
          level: 'MEDIUM',
          userId: '37c42eec-84db-428c-ad6e-9954ff3d6cc3',
          createdAt: '2024-10-24T16:44:19.254Z',
          updatedAt: '2024-10-24T16:44:19.254Z',
        },
        {
          taskId: '99b23ee4-44c0-4934-a899-b9bbcfe88cc4',
          title: 'Task 1',
          description: 'Ir al gym',
          deadline: '2024-10-19T18:53:58.166Z',
          status: 'DONE',
          level: 'MEDIUM',
          userId: '37c42eec-84db-428c-ad6e-9954ff3d6cc3',
          createdAt: '2024-10-19T18:53:58.166Z',
          updatedAt: '2024-10-19T18:53:58.166Z',
        },
      ],
    };

    const tasksMock3 = [] as unknown as TasksResultModel;

    it('Should return 0% tasks completed', () => {
      const result = calculatePercentageTaskCompleted(tasksMock1);

      expect(result).toEqual(0);
    });

    it('Should return 25% tasks completed', () => {
      const result = calculatePercentageTaskCompleted(tasksMock2);

      expect(result).toEqual(25);
    });

    it('Should return null', () => {
      const result = calculatePercentageTaskCompleted(tasksMock3);

      expect(result).toBeNull();
    });
  });
});

