import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ItemReorderEventDetail } from '@ionic/angular';
import { Recepy } from 'src/app/models/recepy';
import { FireService } from 'src/app/services/fire.service';
import { UtilityService } from 'src/app/services/utility.service';

const RECEPY_BOOK_ROUTE_PATH: string = "/tabs/recepy-book";
const ADD_RECEPY_FORM_ROUTE_PATH = "recepy-form";
const SEARCH_RECEPY_BY_NAME_PLACEHOLDER = "Procurar por nome ...";
const LOADING_RECEPY_BOOK_MSG: string = "A carregar receitas ...";

@Component({
  selector: 'app-recepy-book',
  templateUrl: './recepy-book.page.html',
  styleUrls: ['./recepy-book.page.scss'],
  standalone: false
})
export class RecepyBookPage implements OnInit {

  public addRecepyFormRoutePath: string = ADD_RECEPY_FORM_ROUTE_PATH;
  public searchbarPlaceholder: string = SEARCH_RECEPY_BY_NAME_PLACEHOLDER;

  public reorderEntries: boolean = false;
  public isSearchbarOpened: boolean = false;
  public recepyBook: Recepy[] | null = null;
  public showRecepies: Recepy[] = [];

  public static firstLoad: boolean = true;

  constructor(
    private fireService: FireService,
    public util: UtilityService,
    private router: Router
  ) {
    // Load recepy list from Firebase to populate page
    this.router.events.subscribe(e => {
      if (RecepyBookPage.firstLoad || (e instanceof NavigationEnd && e.url === RECEPY_BOOK_ROUTE_PATH && RecepyBookPage.firstLoad)) {
        RecepyBookPage.firstLoad = false;
        const loading = this.util.createLoading();
        loading.present(LOADING_RECEPY_BOOK_MSG);
        this.fireService.getUserRecepyBook()
          .then(recepyBook => {
            loading.dismiss();
            if (!recepyBook) return;
            this.recepyBook = recepyBook;
            this.showRecepies = recepyBook;
          });
      }
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

  public deleteRecepyLocally(recepy: Recepy) {
    const idx: number = this.recepyBook?.indexOf(recepy) ?? -1;
    if (idx > -1) {
      this.recepyBook?.splice(idx, 1);
    }
  }

}
