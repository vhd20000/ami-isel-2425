import { Component, OnInit } from '@angular/core';
import { LoadingController, LoadingOptions } from '@ionic/angular';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  standalone: false
})
export class LoadingComponent  implements OnInit {

  private loading!: HTMLIonLoadingElement;
  private isOpen: boolean = false;

  constructor(private loadingController: LoadingController) { }

  ngOnInit() { }

  /**
   * PRIVATE METHODS
   */
  private async init(msg: string) {
    this.loading = await this.loadingController.create({ message: msg });
  }

  /**
   * PUBLIC METHODS
   */
  public present(msg: string): void {
    this.isOpen = true;
    this.init(msg).then(() => this.loading.present());
  }

  public dismiss(): void {
    if (this.isOpen) {
      this.loading.dismiss();
      this.isOpen = false;
    }
  }

  async presentWithDuration(msg: string, duration: number) {
    const loading = await this.loadingController.create({
      message: msg,
      duration: duration
    });
    await loading.present();
  }

}
