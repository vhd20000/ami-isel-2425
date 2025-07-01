import { Component } from '@angular/core';
import { Task } from '../task/task';
import { FireserviceService } from '../fireservice/fireservice.service';
import { IonItemSliding } from '@ionic/angular';
import { FireauthService } from '../fireauth/fireauth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  tasks: any[] = [];

  constructor(
    private router: Router,
    private fser: FireserviceService,
    private authService: FireauthService,
  ) {
    this.tasks = [
      { title: "Milk", status: "open" },
      { title: "Eggs", status: "open" },
      { title: "Pancake Mix", status: "open" },
    ];
  }

  ngOnInit() {
    this.fser.getTasks().subscribe(data => {
      this.tasks = data.sort((a, b) => (a.title).localeCompare(b.title));
      console.log("loaded data from firebase: ", data);
    });
  }

  addTask() {
    let nTask: string | null = prompt("New Task");
    if(nTask !== "") {
      let t: Task = {
        $key: '', 
        title: nTask ?? "", 
        status: 'open'
      };
      console.log("t: ", t);
      this.fser.createTask(t)
        .then(resp => {
          console.log("createTask: then - ", resp);
        })
        .catch(error => {
          console.log("createTask: catch - ", error);
        });
      console.log("addTask: ", this.tasks);
    }
  }

  markAsDone(slidingItem: IonItemSliding, task: Task) {
    task.status = (task.status === "done") ? "open" : "done";
    console.log("markAsDone: ", task);
    this.fser.updateTask(task.$key, task);
    slidingItem.close();
  }
  
  removeTask(slidingItem: IonItemSliding, task:any) {
    task.status = "removed";
    this.fser.deleteTask(task.$key);
    slidingItem.close();
  }

  logout() {
    this.authService.doLogout()
      .then(res => {
        this.router.navigate(["/login"]);
      }, err => {
        console.log(err);
      });
  }
}
