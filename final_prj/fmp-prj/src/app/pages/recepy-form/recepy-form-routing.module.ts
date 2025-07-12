import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecepyFormPage } from './recepy-form.page';

const routes: Routes = [
  {
    path: '',
    component: RecepyFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecepyFormPageRoutingModule {}
