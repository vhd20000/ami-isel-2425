import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { VIDEOS } from '../video/videos';
import { Video } from '../video/video';

@Component({
  selector: 'app-videoplay',
  templateUrl: './videoplay.page.html',
  styleUrls: ['./videoplay.page.scss'],
  standalone: false
})
export class VideoplayPage implements OnInit {
  id: any = null;
  videos: Video[] = VIDEOS;

  constructor(
    public sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('sid');
    console.log ("details: "+ this.id);
  }

  getURL(): string {
    let video = this.videos.filter(v => v.id == this.id);
    console.log("url: " + video[0].url);
    return video[0].url;
  }
}