import { Injectable } from '@angular/core';
import { WebrequestService } from './webrequest.service';

@Injectable({
  providedIn: 'root'
})
export class TaskserviceService {

  constructor(private webReqService: WebrequestService) { }

  //*--------List methods--------
  createList(Ltitle: string) {
    return this.webReqService.post('lists', { Ltitle: Ltitle });
  }

  getList() {
    return this.webReqService.get('lists');
  }


  //*--------Task methods--------
  getTask(listId: string) {
    return this.webReqService.get(`lists/${listId}/task`);
  }
}
