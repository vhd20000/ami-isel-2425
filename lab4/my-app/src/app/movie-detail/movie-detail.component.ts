import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movies/movie.service';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-detail',
  standalone: false,
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css'
})
export class MovieDetailComponent implements OnInit {
  @Input() movie: Movie = {} as Movie;

  constructor(
    public sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private movieService: MovieService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getMovie();
  }

  getMovie(): void {
    const id = +(this.route.snapshot.paramMap.get('id') || -1);
    this.movieService.getMovie(id)
      .subscribe(movie => this.movie = movie);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.movieService.updateMovie(this.movie)
      .subscribe(() => this.goBack());
  }
}
