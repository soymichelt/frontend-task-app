import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkDropListGroup,
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { GroupKey, GroupType, TaskGroupList, TaskItem } from './lists.model';

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [
    CommonModule,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
  ],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.scss',
})
export class ListsComponent {
  public groups: GroupType[] = [
    { key: 'TODO', label: 'To-Do' },
    { key: 'IN_PROGRESS', label: 'In Progress' },
    { key: 'TEST', label: 'Test' },
    { key: 'ON_HOLD', label: 'On Hold' },
    { key: 'DONE', label: 'Done' },
  ];

  public tasks: TaskGroupList = {
    TODO: [
      {
        taskId: '1',
        group: 'Personal',
        title: 'Tengo que ir al gym a partir de manana',
        description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown`,
        status: 'TODO',
        level: 'MEDIUM',
        createdAt: '2024-10-21T18:26:08.396Z',
      },
    ],
    IN_PROGRESS: [],
    TEST: [],
    ON_HOLD: [],
    DONE: [],
  };

  public drop(event: CdkDragDrop<TaskItem[]>): void {
    if (event.previousContainer === event.container) {
      return;
    }

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    console.log(this.tasks);
  }

  public getListData(groupKey: GroupKey): TaskItem[] {
    const list = this.tasks[groupKey] || [];
    return list;
  }

  public getListCount(groupKey: GroupKey): number {
    const list = this.tasks[groupKey] || [];
    return list.length || 0;
  }

  public getListConnectedTo(groupKey: GroupKey): string[] {
    const groups =
      this.groups
        .filter(({ key }) => key !== groupKey)
        .map(({ key }) => `${key}_LIST`) || [];

    return groups;
  }
}