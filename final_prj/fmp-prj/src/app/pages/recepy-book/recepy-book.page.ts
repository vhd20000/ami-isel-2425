import { Component, OnInit } from '@angular/core';
import { ItemReorderEventDetail } from '@ionic/angular';
import { Recepy } from 'src/app/models/recepy';
import { FireService } from 'src/app/services/fire.service';
import { UtilityService } from 'src/app/services/utility.service';

const ADD_RECEPY_FORM_PAGE = "recepy-form";
const SEARCH_RECEPY_BY_NAME_PLACEHOLDER = "Procurar por nome ...";

@Component({
  selector: 'app-recepy-book',
  templateUrl: './recepy-book.page.html',
  styleUrls: ['./recepy-book.page.scss'],
  standalone: false
})
export class RecepyBookPage implements OnInit {

  public addRecepyFormPage: string = ADD_RECEPY_FORM_PAGE;
  public searchbarPlaceholder: string = SEARCH_RECEPY_BY_NAME_PLACEHOLDER;

  public reorderEntries: boolean = false;
  public isSearchbarOpened: boolean = false;
  public recepyBook: Recepy[] | null = null;
  public showRecepies: Recepy[] = [];

  constructor(
      private fireService: FireService,
      public util: UtilityService,
    ) {
      fireService.getUserRecepyBook().then(recepyBook => {
        console.log(recepyBook);
        if (!recepyBook) return;
        this.recepyBook = recepyBook;
        this.showRecepies = recepyBook;
      });
    }

  ngOnInit() { }

  /**
   * PUBLIC METHODS
   */
  public toggleReorderItems() {
    this.reorderEntries = !this.reorderEntries;
  }

  public toggleSearchbar() {
    this.isSearchbarOpened = !this.isSearchbarOpened;
  }

  public handleInput(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.toLowerCase() || '';
    if (query === '') {
      this.showRecepies = [...this.recepyBook!];
      return;
    }
    this.showRecepies = this.recepyBook!.filter(recepy => recepy.name.toLowerCase().includes(query));
  }

  public log(value: any) {
    console.log(value);
  }

}
