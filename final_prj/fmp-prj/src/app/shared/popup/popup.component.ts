import { Component, Input, OnInit } from '@angular/core';

const CANCEL_BUTTON_TEXT = "Cancel";
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

  constructor() {
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
