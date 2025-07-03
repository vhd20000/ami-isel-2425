import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'meal-plan',
        loadChildren: () => import('../../pages/meal-plan/meal-plan.module').then(m => m.MealPlanPageModule)
      },
      {
        path: 'recepy-book',
        loadChildren: () => import('../../pages/recepy-book/recepy-book.module').then(m => m.RecepyBookPageModule)
      },
      {
        path: 'shopping-list',
        loadChildren: () => import('../../pages/shopping-list/shopping-list.module').then(m => m.ShoppingListPageModule)
      },
      {
        path: 'groups',
        loadChildren: () => import('../../pages/groups/groups.module').then(m => m.GroupsPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/meal-plan',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/meal-plan',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
