import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { MealPlan } from 'src/app/models/meal-plan';
import { Recepy } from 'src/app/models/recepy';
import { FireService } from 'src/app/services/fire.service';
import { UtilityService } from 'src/app/services/utility.service';

const MEAL_PLAN_ROUTE_PATH: string = "/tabs/meal-plan";
const NO_RECEPIES_REGIST_ERROR_MSG: string = "Não tem receitas registadas, por favor, acrescente algumas.";
const UPLOAD_MEAL_PLAN_LOADING_MSG = "A gerar um novo plano ...";
const UPLOAD_MEAL_PLAN_SUCCESS_MSG = "Plano gerado com sucesso !";
const UPLOAD_MEAL_PLAN_FAIL_MSG = "Ocorreu um erro ao gerar um novo plano.";
const GENERATED_MEAL_PLAN_NOTIFICATION_TITLE = "Plano atualizado";
const GENERATED_MEAL_PLAN_NOTIFICATION_BODY = "O seu novo plano de refeições semanal está pronto! Venha ver o que preparamos para si.";
const LOADING_PLAN_MSG: string = "A carregar plano ...";
const DEBUG_WAIT_TIME: number = 1000;  // 1s

@Component({
  selector: 'app-meal-plan',
  templateUrl: './meal-plan.page.html',
  styleUrls: ['./meal-plan.page.scss'],
  standalone: false
})
export class MealPlanPage implements OnInit {

  public mealPlan: MealPlan | null = null;
  public firstLoad: boolean = true;

  constructor(
    private fireService: FireService,
    private router: Router,
    public util: UtilityService
  ) {
    // Load recepy list from Firebase to populate page
    this.router.events.subscribe(e => {
      if (this.firstLoad || (e instanceof NavigationEnd && e.url === MEAL_PLAN_ROUTE_PATH && this.firstLoad)) {
        this.firstLoad = false;
        const loading = this.util.createLoading();
        loading.present(LOADING_PLAN_MSG);
        fireService.getUserMealPlan().then(mealPlan => {
          loading.dismiss();
          if (!mealPlan) return;
          this.mealPlan = mealPlan;
        });
      }
    });
  }

  ngOnInit() { }

  /**
   * PUBLIC METHODS
   */

  
  public async tryUpdateMealPlan() {
    const userRecepies: Recepy[] = await this.fireService.getUserRecepyBook() ?? [];

    if (userRecepies.length < 1) {
      this.util.openToast(NO_RECEPIES_REGIST_ERROR_MSG);
      return;
    }

    // Generate a new plan (pick random meals from user's recepy book)
    const newMealPlan: MealPlan = this.util.generateNewMealPlan(userRecepies);

    // Try upload new plan to firestore
    let showSuccessNotification: boolean = false;
    const loading = this.util.createLoading();
    loading.present(UPLOAD_MEAL_PLAN_LOADING_MSG);
    // [DEBUG] Set a timer to mimic a wait in db response
    await this.util.delay(DEBUG_WAIT_TIME);
    await this.fireService.updateUserMealPlan(newMealPlan)
      .then(res => {
        this.util.openToast(UPLOAD_MEAL_PLAN_SUCCESS_MSG);
        showSuccessNotification = true;
      })
      .catch(err => {
        this.util.openToast(UPLOAD_MEAL_PLAN_FAIL_MSG);
      })
      .finally(() => {
        loading.dismiss();
      });

      // redirect on success
      if (showSuccessNotification) {
        this.mealPlan = newMealPlan;
        this.util.schduleBasicLocalNotification(
          GENERATED_MEAL_PLAN_NOTIFICATION_TITLE,
          GENERATED_MEAL_PLAN_NOTIFICATION_BODY
        );
      }
  }

}
