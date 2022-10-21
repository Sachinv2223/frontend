import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TaskserviceService } from 'src/app/Services/taskservice.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit {

  @Output()
  isDataModifyEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private taskservice: TaskserviceService) { }

  ngOnInit(): void {
  }

  cancelListModify() {
    this.isDataModifyEmitter.emit(false);
  }

  createList(listInput: string) {
    this.taskservice.createList(listInput).subscribe({
      next: (res: any) => {
        this.isDataModifyEmitter.emit(false);
      }
    })
  }

}
