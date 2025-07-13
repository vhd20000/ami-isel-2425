import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireService } from 'src/app/services/fire.service';
import { FireauthService } from 'src/app/services/fireauth.service';
import { UtilityService } from 'src/app/services/utility.service';

const CANCEL_BUTTON_TEXT = "Cancelar";
const ACTION_BUTTON_TEXT = "OK";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  standalone: false
})
export class PopupComponent  implements OnInit {

  @Input() header: string = "";
  @Input() subHeader: string = "";
  @Input() message: string = "";

  @Input() popupActionFunction?: ()=>any = ()=>{};
  @Input() popupCancelFunction?: ()=>any = ()=>{};

  public alertButtons: any[] = [];
  public isOpen = false;

  constructor(
    private router: Router,
    private util: UtilityService,
    private fireService: FireService,
    private authService: FireauthService,
  ) {
    this.alertButtons = [
      {
        text: CANCEL_BUTTON_TEXT,
        role: 'cancel',
        handler: () => {
          if (this.popupCancelFunction) {
            this.popupCancelFunction();
          }
        },
      },
      {
        text: ACTION_BUTTON_TEXT,
        role: 'confirm',
        handler: () => {
          if (this.popupActionFunction) {
            this.popupActionFunction();
          }
        },
      },
    ];
  }

  ngOnInit() {}

  /**
   * PUBLIC METHODS
   */

  public openPopup() {
    if(!this.isOpen) {
      this.isOpen = true;
    }
  }

}
