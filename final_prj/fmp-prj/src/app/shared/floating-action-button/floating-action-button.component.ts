import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-fab',
  templateUrl: './floating-action-button.component.html',
  styleUrls: ['./floating-action-button.component.scss'],
  standalone: false
})
export class FloatingActionButtonComponent  implements OnInit {

  @Input() icon: string = "add";
  @Input() vertical: string = "bottom";
  @Input() horizontal: string = "end";

  constructor() { }

  ngOnInit() {}

}
