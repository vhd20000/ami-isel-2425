import { Component, Input, OnInit } from '@angular/core';
import { Recepy } from 'src/app/models/recepy';

const RECEPY_PIC: string = "https://ionicframework.com/docs/img/demos/thumbnail.svg";

@Component({
  selector: 'app-meal-plan-card',
  templateUrl: './meal-plan-card.component.html',
  styleUrls: ['./meal-plan-card.component.scss'],
  standalone: false
})
export class MealPlanCardComponent  implements OnInit {

  public recepyPic: string = RECEPY_PIC;

  @Input() date: Date = new Date();
  @Input() recepies: Recepy[] = [];

  constructor() { }

  ngOnInit() {}

}
