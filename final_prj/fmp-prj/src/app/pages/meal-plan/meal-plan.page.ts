import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meal-plan',
  templateUrl: './meal-plan.page.html',
  styleUrls: ['./meal-plan.page.scss'],
  standalone: false
})
export class MealPlanPage implements OnInit {

  // FIXME temporary data
  public mealPlan: any = [
    {
      date: new Date("7/7/2025"),
      recepies: [
        {
          name: "Esparguete à bolonhesa",
          mealType: "Almoço"
        },
        {
          name: "Caldeirada de peixe",
          mealType: "Jantar"
        },
      ],
    },
    {
      date: new Date("7/8/2025"),
      recepies: [
        {
          name: "Arroz de atum",
          mealType: "Almoço"
        },
        {
          name: "Jardineira de frango",
          mealType: "Jantar"
        },
      ],
    },
    {
      date: new Date("7/9/2025"),
      recepies: [
        {
          name: "Lasanha de carne",
          mealType: "Almoço"
        },
        {
          name: "Caldo verde",
          mealType: "Jantar"
        },
      ],
    },
  ];

  constructor() { }

  ngOnInit() { }

}
