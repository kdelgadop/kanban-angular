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
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {FormControl, FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { Board } from '../models/board.models';
import { Column } from '../models/column.model';

import { TaskCardComponent } from '../task-card/task-card.component';


@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [
              CdkDropList, 
              CdkDrag, 
              MatIconModule, 
              CdkDropListGroup, 
              MatFormFieldModule, 
              FormsModule, 
              MatInputModule,
              MatButtonModule, 
              TaskCardComponent
              MatIconModule
            ],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss'
})
export class MainViewComponent {
  @ViewChildren('saveBtn') saveBtn: QueryList<ElementRef> | undefined;

  ngOnInit() {}

  board: Board = new Board('New Column',[
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

  inputColumn(columnName: string) {
    return `${columnName}`;
  }

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
    this.board.columns[index].tasks.push('')
  }
  removeTask(column: string, index: number) {
    // Map on the columns to get the one of this task by the name
    const boardColumnIndex = this.board.columns.map(col => col.name).indexOf(column)
    this.board.columns[boardColumnIndex].tasks.splice(index, 1)[index]
  }
  handleChange(index: number, column: string) {
    const saveButton = document.querySelector(`button[data-columnname="${column}"][data-index="${index}"]`)
    saveButton?.classList.remove('hidden');
  }
  onSubmit(column: string, index: number) {
    // Map on the columns to get the one of this task by the name
    const boardColumnIndex = this.board.columns.map(col => col.name).indexOf(column)
    this.board.columns[boardColumnIndex].tasks[index] = (<HTMLInputElement>document.getElementById(`${column}-${index}`)).value
    const saveButton = document.querySelector(`button[data-columnname="${column}"][data-index="${index}"]`)
    saveButton?.classList.add('hidden');
  }
}

