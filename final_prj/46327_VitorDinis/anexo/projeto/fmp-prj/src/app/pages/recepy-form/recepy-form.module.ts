import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecepyFormPageRoutingModule } from './recepy-form-routing.module';

import { RecepyFormPage } from './recepy-form.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecepyFormPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [RecepyFormPage]
})
export class RecepyFormPageModule {}
