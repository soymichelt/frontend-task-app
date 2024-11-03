import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { LoadingScreenComponent } from './shared/components/loading-screen/loading-screen.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LoadingScreenComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('500ms ease-out', style({ opacity: 0 }))]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  public title: string = 'Buddy - Task App';
  public isLoading$: BehaviorSubject<boolean>;

  constructor() {
    this.isLoading$ = new BehaviorSubject<boolean>(true);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading$.next(false);
    }, 3000);
  }
}
