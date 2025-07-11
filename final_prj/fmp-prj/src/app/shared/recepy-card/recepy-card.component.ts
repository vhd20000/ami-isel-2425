import { Component, Input, OnInit } from '@angular/core';
import { ItemReorderEventDetail } from '@ionic/angular';
import { Recepy } from 'src/app/models/recepy';
import { UtilityService } from 'src/app/services/utility.service';

const RECEPY_PIC: string = "https://ionicframework.com/docs/img/demos/thumbnail.svg";

@Component({
  selector: 'app-recepy-card',
  templateUrl: './recepy-card.component.html',
  styleUrls: ['./recepy-card.component.scss'],
  standalone: false
})
export class RecepyCardComponent  implements OnInit {

  @Input() recepy!: Recepy;
  @Input() isReorderModeActive: boolean = false;

  public recepyPic: string = RECEPY_PIC;

  constructor(private util: UtilityService) { }

  ngOnInit() {}

  /**
   * PUBLIC METHODS
   */

  public deleteRecepyByIdHandler(recepyId: string) {
    // TODO
    this.util.openToast("Por implementar ...");
    // this.deleteRecepyById();
  }

  public handleReorder(event: CustomEvent<ItemReorderEventDetail>) {
    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    event.detail.complete();
  }

}
