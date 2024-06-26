import {
          Component, 
          ElementRef, 
          ViewChildren, 
          QueryList
       } from '@angular/core';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { Board } from '../models/board.models';
import { Column } from '../models/column.model';

import { TaskCardComponent } from '../task-card/task-card.component';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [
              CdkDropList, 
              CdkDrag, 
              MatIconModule, 
              CdkDropListGroup, 
              MatButtonModule, 
              TaskCardComponent,
              MatTabsModule,
              MatFormFieldModule,
              MatInputModule,
              CommonModule
            ],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss'
})
export class MainViewComponent {
  @ViewChildren('saveBtn') saveBtn: QueryList<ElementRef> | undefined;

  ngOnInit() {}

  board: Board = new Board('New Board',[
    new Column('Ideas', [
      ""
    ]),
    new Column('Research', [
      ""
    ]),
    new Column('Todo', [
      ""
    ]),
    new Column('Done', [
      ""
    ])
  ]);

  boards: Board[] = [this.board]

  nameEdit: boolean = false
  newNameEdit: string = ''

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  // Define a type guard to narrow down the event target to an input element
  isInputEvent(event: Event): event is Event & { target: HTMLInputElement } {
    return (event.currentTarget instanceof HTMLInputElement);
  }
  addTask(index: number) {
    const board = document.querySelector('[data-boardindex]')
    if (board instanceof HTMLElement) {
      var boardIndex: number = Number(board.dataset['boardindex']);
      if (typeof boardIndex === 'number')
        this.boards[boardIndex].columns[index].tasks.push('')
    }
  }
  addBoard() {
    this.boards.push(new Board('New Board',[
      new Column('Ideas', [
        ""
      ]),
      new Column('Research', [
        ""
      ]),
      new Column('Todo', [
        ""
      ]),
      new Column('Done', [
        ""
      ])
    ]))
  }
  toggleNameEdit() {
    this.nameEdit = !this.nameEdit
  }
  setNewName(event: Event) {
    const newName = event.currentTarget as HTMLInputElement
    this.newNameEdit = newName.value
  }
  saveName() {
    if (this.newNameEdit) {
      const board = document.querySelector('[data-boardindex]')
      if (board instanceof HTMLElement) {
        var boardIndex: number = Number(board.dataset['boardindex']);
        if (typeof boardIndex === 'number')
          this.boards[boardIndex].name = this.newNameEdit 
      }
    }
    //resetting values
    this.newNameEdit = ''
    this.nameEdit = false
  }
}


