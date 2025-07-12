import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  standalone: false
})
export class ToastComponent  implements OnInit {

  constructor(private toastController: ToastController) { }

  ngOnInit() {}

  async presentToast(msg: string, duration: number, position: ToastPosition) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duration,
      position: position,
    });
    await toast.present();
  }
}

export enum ToastPosition {
  TOP = 'top',
  MIDDLE = 'middle',
  BOTTOM = 'bottom',
}