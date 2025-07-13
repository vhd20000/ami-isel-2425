import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ItemReorderEventDetail } from '@ionic/angular';
import { Recepy } from 'src/app/models/recepy';
import { FireService } from 'src/app/services/fire.service';
import { UtilityService } from 'src/app/services/utility.service';

const RECEPY_PIC: string = "https://ionicframework.com/docs/img/demos/thumbnail.svg";
const DELETE_RECEPY_LOADING_MSG = "A apagar receita ...";
const DELETE_RECEPY_SUCCESS_MSG = "Receita apagada com sucesso !";
const DELETE_RECEPY_ERROR_MSG: string = "Ocorreu um erro ao apagar uma receita.";

@Component({
  selector: 'app-recepy-card',
  templateUrl: './recepy-card.component.html',
  styleUrls: ['./recepy-card.component.scss'],
  standalone: false
})
export class RecepyCardComponent  implements OnInit {

  @Input() recepy!: Recepy;
  @Input() isReorderModeActive: boolean = false;
  @Output() deleteElement: EventEmitter<any> = new EventEmitter();

  public recepyPic: string = RECEPY_PIC;

  constructor(
    public fireService: FireService,
    public util: UtilityService,
  ) { }

  ngOnInit() {}

  /**
   * PUBLIC METHODS
   */

  public editRecepyByIdHandler(recepyId: string) {
    // TODO
    this.util.openToast("editar elemento ...");
    // this.deleteRecepyById();
  }

  public async tryDeleteRecepyById(recepyId: string) {
    let deleteCard: boolean = false;

    // Try delete recepy from firestore
    const loading = this.util.createLoading();
    loading.present(DELETE_RECEPY_LOADING_MSG);
    await this.fireService.deleteRecepyById(recepyId)
      .then(res => {
        deleteCard = true;
        this.util.openToast(DELETE_RECEPY_SUCCESS_MSG);
      })
      .catch(err => {
        this.util.openToast(DELETE_RECEPY_ERROR_MSG);
      })
      .finally(() => {
        loading.dismiss();
      });
    
    if (deleteCard) {
      this.deleteElement.emit();
    }
  }
}
