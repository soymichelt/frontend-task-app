import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { groups } from '../../utils/tasks/tasks.utils';
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
    NgOptimizedImage,
  ],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.scss',
})
export class ListsComponent {
  @Output() handleAddTaskClick = new EventEmitter<string>();
  @Output() handleEditTaskClick = new EventEmitter<TaskItem>();
  @Output() handleDeleteTaskClick = new EventEmitter<TaskItem>();
  @Output() handleCompleteTaskClick = new EventEmitter<TaskItem>();
  @Output() handleUpdateTaskStatus = new EventEmitter<{
    task: TaskItem;
    newStatus: string;
  }>();

  @Input() public tasks!: TaskGroupList;

  public groups: GroupType[];

  constructor() {
    this.groups = groups;
  }

  public drop(event: CdkDragDrop<TaskItem[]>): void {
    if (event.previousContainer.id === event.container.id) {
      return;
    }

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );

    const { data } = event.container;
    const task = data?.[event.currentIndex];
    const newStatus = event.container.id.replace('_LIST', '');

    this.handleUpdateTaskStatus.emit({
      task,
      newStatus,
    });
  }

  public getListData(groupKey: GroupKey): TaskItem[] {
    const list = this.tasks?.[groupKey] || [];
    return list;
  }

  public listIsEmpty(groupKey: GroupKey): boolean {
    return !this.getListData(groupKey)?.length;
  }

  public getListCount(groupKey: GroupKey): number {
    const list = this.tasks?.[groupKey] || [];
    return list?.length || 0;
  }

  public getListConnectedTo(groupKey: GroupKey): string[] {
    const connectedTo =
      groups
        .filter(({ key }) => key !== groupKey)
        .map(({ key }) => `${key}_LIST`) || [];

    return connectedTo;
  }

  public onAddTaskClick(group: string): void {
    this.handleAddTaskClick.emit(group);
  }

  public onEditTaskClick(task: TaskItem): void {
    this.handleEditTaskClick.emit(task);
  }

  public onDeleteTaskClick(task: TaskItem): void {
    this.handleDeleteTaskClick.emit(task);
  }

  public onCompleteTaskClick(task: TaskItem): void {
    this.handleCompleteTaskClick.emit(task);
  }

  public taskIsCompleted(status: string): boolean {
    return status === 'DONE';
  }
}
