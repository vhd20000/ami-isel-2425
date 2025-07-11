import { Component, OnInit } from '@angular/core';
import { ItemReorderEventDetail } from '@ionic/angular';
import { Recepy } from 'src/app/models/recepy';
import { UtilityService } from 'src/app/services/utility.service';

const SEARCH_RECEPY_BY_NAME_PLACEHOLDER = "Procurar por nome ...";

@Component({
  selector: 'app-recepy-book',
  templateUrl: './recepy-book.page.html',
  styleUrls: ['./recepy-book.page.scss'],
  standalone: false
})
export class RecepyBookPage implements OnInit {

  public searchbarPlaceholder: string = SEARCH_RECEPY_BY_NAME_PLACEHOLDER;

  public reorderEntries: boolean = false;
  public isSearchbarOpened: boolean = false;

  public recepyBook: Recepy[] = [
    {
      id: "a",
      recepyName: "Arroz de pato",
      prepTimeMins: 40,
      servings: "4-6",
    } as Recepy,
    {
      id: "b",
      recepyName: "Sopa",
      prepTimeMins: 20,
      servings: "2",
    } as Recepy,
  ];

  public showRecepies: Recepy[] = [];

  constructor(public util: UtilityService) {
    this.showRecepies = [...this.recepyBook];
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
      this.showRecepies = [...this.recepyBook];
      return;
    }
    this.showRecepies = this.recepyBook.filter(recepy => recepy.recepyName.toLowerCase().includes(query));
  }

  public handleReorder(event: CustomEvent<ItemReorderEventDetail>) {
    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    event.detail.complete();
  }

}
