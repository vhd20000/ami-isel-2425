import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import { Movie } from '../movie';
import { MovieService } from '../movies/movie.service';

@Component({
  selector: 'app-movie-search',
  standalone: false,
  templateUrl: './movie-search.component.html',
  styleUrl: './movie-search.component.css'
})
export class MovieSearchComponent implements OnInit {
  movies$: Observable<Movie[]> = of([]);
  private searchTerms = new Subject<string>();

  constructor(
    private movieService: MovieService
  ) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.movies$ = this.searchTerms
      .pipe(
        // wait 300ms after each keystroke before considering the term
        debounceTime(300),
        // ignore new term if same as previous term
        distinctUntilChanged(),
        // switch to new search observable each time the term changes
        switchMap((term: string) => this.movieService.searchMovies(term))
      );
  }
}