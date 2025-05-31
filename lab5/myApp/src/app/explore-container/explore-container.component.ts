import { Component, Input, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
  standalone: false,
})
export class ExploreContainerComponent implements OnInit {

  @Input() name?: string;

  platforms: string[] = [];

  constructor(private platform: Platform) {}

  ngOnInit() {
    this.platform.ready().then(() => {
      this.platforms = this.platform.platforms();
    });
  }

}


// TODO Lab5 - Continuar do ponto 16 (instalar Android Studio)