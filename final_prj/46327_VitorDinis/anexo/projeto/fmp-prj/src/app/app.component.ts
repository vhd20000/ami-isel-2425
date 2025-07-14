import { Component, OnInit, ViewChild } from '@angular/core';
import { UtilityService } from './services/utility.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {

  constructor(
    private util: UtilityService
  ) { }

  async ngOnInit() {
    await this.util.requestLocalNotificationPermission();
  }

}
