import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-coming-soon-notice',
  templateUrl: './coming-soon-notice.component.html',
  styleUrls: ['./coming-soon-notice.component.scss'],
  standalone: false
})
export class ComingSoonNoticeComponent  implements OnInit {

  @Input() pageName?: string;

  constructor() { }

  ngOnInit() {}

}
