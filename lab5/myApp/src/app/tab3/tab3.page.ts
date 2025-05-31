import { Component } from '@angular/core';
import { VIDEOS } from '../video/videos';
import { Video } from '../video/video';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {
  videos: Video[] = VIDEOS;

  constructor(public nav: NavController) {}
  
  OpenNavVideoPlay(id:number) {
    this.nav.navigateForward("/videoplay/" + id);
    console.log ("id: " + id);
  }
}