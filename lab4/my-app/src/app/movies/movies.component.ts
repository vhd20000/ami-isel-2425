import { Component } from '@angular/core';
import { Movie } from '../movie';

@Component({
  selector: 'app-movies',
  standalone: false,
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent {
  movie: Movie = new Movie(0, "Avatar", "avatar.com");
}
