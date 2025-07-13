import { Component, OnInit, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss'],
  standalone: false
})
export class GroupsPage implements OnInit {

  constructor(public util: UtilityService) {}

  ngOnInit() { }

}
