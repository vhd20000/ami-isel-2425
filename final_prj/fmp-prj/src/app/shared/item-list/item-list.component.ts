import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';

const DEFAULT_ITEM = "Ingrediente";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  standalone: false
})
export class ItemListComponent  implements OnInit {

  @Input() displayMode: boolean = true;
  @Input() showItemsCount: boolean = false;
  @Input() displayInTextarea: boolean = false;

  @Input() label!: string;
  @Input() itemList!: any[];
  @Output() itemListChange = new EventEmitter<any>();

  // @ViewChild('itemToAdd') categoryToAdd!: ElementRef;

  constructor(public util: UtilityService) { }

  ngOnInit() { }

  /**
   * PUBLIC METHODS
   */
  public addItem() {
    this.itemList = [DEFAULT_ITEM].concat(this.itemList);
  }

  public deleteItem(item: string) {
    let idx = this.itemList.indexOf(item);
    if (idx > -1) {
      this.itemList.splice(idx, 1);
    }
  }

  public clearList() {
    this.itemList = [];
  }

  public itemTextFormater(item: string, idx: number = 0): string {
    if (!this.showItemsCount) return item;
    return `${idx+1}. ${"aaisd foiaujsdi faosidj foaisdj ofiasjdo ajdsfio sadjfoias dofi asdofj aodsifjaosdijfaos dijfosadifoajsid fo"}`;
  }
}
