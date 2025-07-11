import { Component, OnInit } from '@angular/core';
import { MealPlan } from 'src/app/models/meal-plan';
import { FireService } from 'src/app/services/fire.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-meal-plan',
  templateUrl: './meal-plan.page.html',
  styleUrls: ['./meal-plan.page.scss'],
  standalone: false
})
export class MealPlanPage implements OnInit {

  // FIXME temporary data
  // public mealPlan: any = [
  //   {
  //     date: new Date("7/7/2025"),
  //     recepies: [
  //       {
  //         name: "Esparguete à bolonhesa",
  //         mealType: "Almoço",
  //         id: "1"
  //       },
  //       {
  //         name: "Caldeirada de peixe",
  //         mealType: "Jantar",
  //         id: "2"
  //       },
  //     ],
  //   },
  //   {
  //     date: new Date("7/8/2025"),
  //     recepies: [
  //       {
  //         name: "Arroz de atum",
  //         mealType: "Almoço",
  //         id: "3"
  //       },
  //       {
  //         name: "Jardineira de frango",
  //         mealType: "Jantar",
  //         id: "4"
  //       },
  //     ],
  //   },
  //   {
  //     date: new Date("7/9/2025"),
  //     recepies: [
  //       {
  //         name: "Lasanha de carne",
  //         mealType: "Almoço"
  //       },
  //       {
  //         name: "Caldo verde",
  //         mealType: "Jantar"
  //       },
  //     ],
  //   },
  //   {
  //     date: new Date("7/10/2025"),
  //     recepies: [
  //       {
  //         name: "Lasanha de carne",
  //         mealType: "Almoço"
  //       },
  //       {
  //         name: "Caldo verde",
  //         mealType: "Jantar"
  //       },
  //     ],
  //   },
  //   {
  //     date: new Date("7/11/2025"),
  //     recepies: [
  //       {
  //         name: "Lasanha de carne",
  //         mealType: "Almoço"
  //       },
  //       {
  //         name: "Caldo verde",
  //         mealType: "Jantar"
  //       },
  //     ],
  //   },
  // ];

  public mealPlan: MealPlan = new MealPlan([]);

  constructor(
    private fireService: FireService,
    public util: UtilityService,
  ) {
    fireService.getMealPlan().then(mealPlan => {
      console.log(mealPlan);
      if (!mealPlan) return;
      this.mealPlan = mealPlan;
    });
  }

  ngOnInit() { }

}
