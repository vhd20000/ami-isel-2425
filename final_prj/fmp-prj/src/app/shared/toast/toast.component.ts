import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

const TOAST_POSITION: 'bottom' = 'bottom';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  standalone: false
})
export class ToastComponent  implements OnInit {

  constructor(private toastController: ToastController) { }

  ngOnInit() {}

  async presentToast(msg: string, duration: number = 1500) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duration,
      position: TOAST_POSITION,
    });

    await toast.present();
  }
}
