import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  standalone: false
})
export class CategoryListComponent  implements OnInit {

  @Input() displayMode: boolean = true;
  @Input() categories!: string[];
  @Output() categoriesChange = new EventEmitter<string[]>();

  constructor() { }

  ngOnInit() {}

  /**
   * PUBLIC METHODS
   */
  public removeEntry(entry: string): void {
    let idx = this.categories.indexOf(entry);
    if (idx > -1) {
      this.categories.splice(idx, 1);
    }
  }

}
