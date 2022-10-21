import { TaskserviceService } from './../../Services/taskservice.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  constructor(private taskserviceService: TaskserviceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.taskserviceService.getList().subscribe({
      next: (responseLists: any) => {
        this.lists = [...responseLists];
      }
    });

    this.route.paramMap.subscribe({
      next: (params) => {
        let tempListId = params.get('listId');
        // console.log(tempListId);
        if (tempListId != null) {
          this.taskserviceService.getTask(tempListId).subscribe({
            next: (responseTasks: any) => {
              this.tasks = [...responseTasks];
            }
          });
        }
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
