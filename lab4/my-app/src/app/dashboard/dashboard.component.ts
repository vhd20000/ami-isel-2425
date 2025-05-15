import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movies/movie.service';
import { Movie } from '../movie';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  movies: Movie[] = [];
  
  constructor (
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.movieService.getMovies()
      .subscribe(movies => this.movies = movies.slice(0, 4));
  }
}
