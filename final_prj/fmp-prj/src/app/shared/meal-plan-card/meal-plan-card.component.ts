import { Component, Input, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Recepy } from 'src/app/models/recepy';
import { UtilityService } from 'src/app/services/utility.service';

const DATE_FORMAT: string = "dd/MM/yyyy";
const MEAL_DETAIL_PAGE_ROUTE: string = "meal-detail";
const RECEPY_PIC: string = "https://ionicframework.com/docs/img/demos/thumbnail.svg";

@Component({
  selector: 'app-meal-plan-card',
  templateUrl: './meal-plan-card.component.html',
  styleUrls: ['./meal-plan-card.component.scss'],
  standalone: false
})
export class MealPlanCardComponent  implements OnInit {

  @Input() date: Date = new Date();
  @Input() recepies: Recepy[] = [];
  
  public recepyPic: string = RECEPY_PIC;
  public dateFormat: string = DATE_FORMAT;
  public dateDay: string = "";

  constructor(private util: UtilityService) { }

  ngOnInit() {
    this.dateDay = this.util.getDateDay(this.date, 'long');
  }

  public recepyDetailsHandler(recepy: Recepy) {
    let recepyId = recepy.id;
    console.log(recepyId);
    if (recepyId) {
      this.util.redirectTo(`${MEAL_DETAIL_PAGE_ROUTE}/${recepyId}`);
    }
  }

}
