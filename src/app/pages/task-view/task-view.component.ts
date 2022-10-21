import { TaskserviceService } from './../../Services/taskservice.service';
import { AfterContentChecked, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  constructor(private taskserviceService: TaskserviceService) { }

  ngOnInit(): void {
    this.taskserviceService.getList().subscribe({
      next: (responseLists: any) => {
        this.lists = [...responseLists];
        this.taskserviceService.getTask(this.lists[0]._id).subscribe({
          next: (responseTasks: any) => {
            this.tasks = [...responseTasks];
          }
        });
      }
    });
  }

  lists: { _id: string, Ltitle: string, __v: number }[] = [];
  tasks: { _id: string, Ttitle: string, _listId: string, __v: number }[] = [];

  isListDataUpdating: boolean = false;

  createNewList() {
    this.isListDataUpdating = true;
  }

  fetchListModifyStatus(status: boolean) {
    this.taskserviceService.getList().subscribe({
      next: (responseList: any) => {
        this.lists = [...responseList];
      }
    });
    this.isListDataUpdating = status;
  }

  fetchAllTasksByListId(listId: string) {
    this.taskserviceService.getTask(listId).subscribe({
      next: (responseTasks: any) => {
        this.tasks = [...responseTasks];
        console.log(this.tasks);
      }
    });
  }

}
