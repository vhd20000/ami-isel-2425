import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  standalone: false
})
export class CalendarComponent  implements OnInit {

  monthLabel: string = "";
  weekDays: string[] = [];
  weekDates: number[] = [];

  constructor(private util: UtilityService) {
    let currWeekMonths: string[] = util.getCurrentWeekMonthsSpan();
    this.monthLabel = currWeekMonths.join(" / ");
    this.weekDays = util.getCurrentWeekDays().map(e => e.name);
    this.weekDates = util.getCurrentWeekDays().map(e => e.date.getDate());
  }

  ngOnInit() {}

}
