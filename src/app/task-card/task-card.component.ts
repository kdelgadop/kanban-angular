import { Component, Input } from '@angular/core';
import {
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { Board } from '../models/board.models';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [
    CdkDropList, 
    CdkDrag,
    MatIconModule,
    MatFormFieldModule, 
    MatInputModule,
    MatButtonModule, 
    MatIconModule,
  ],
  templateUrl: './task-card.component.html',
  styleUrl: '../main-view/main-view.component.scss'
})
export class TaskCardComponent {
  @Input()
  column: string = '';
  @Input()
  index: number = 0;
  @Input()
  task: string = '';
  @Input()
  board!: Board;
  
  ngOnInit(): void {}

  inputColumn(columnName: string) {
    return `${columnName}`;
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
