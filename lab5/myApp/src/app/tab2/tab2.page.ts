import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PLAYERS } from '../player/players';
import { Player } from '../player/player';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { ModalpagePage } from '../modalpage/modalpage.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page implements OnInit {

  @ViewChild('swiper') swiperRef: ElementRef | undefined;
  
  select_index: number = 0;
  players: Player[] = PLAYERS;
  
  constructor(
    private modalCtrl: ModalController,
    private actionSheetController: ActionSheetController
  ) {}

  ngOnInit() {
    
  }

  onSlideChange() {
    this.select_index = this.swiperRef?.nativeElement.swiper.activeIndex;
  }

  async openMenu() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Player',
      mode: 'ios',
      buttons: [
        {
          text: 'Play Video',
          icon: 'caret-forward-circle',
          handler: () => {
            console.log('Play clicked');
            this.presentModal();
          }
        },
        {
          text: 'Follow',
          icon: 'logo-twitter',
          handler: () => {
            console.log('Favorite clicked');
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    await actionSheet.present();
  }

  async presentModal() {
    let url = this.players[this.select_index].url;
    const modal = await this.modalCtrl.create({
      component: ModalpagePage,
      componentProps: { value: url }
    });
    return await modal.present();
  }
}
