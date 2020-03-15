import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Movie} from '../../core/model/movie';
import {MovieService} from '../../core/service/movie.service';
import {Router} from '@angular/router';
import {CreateMovieRequest} from '../../core/Contracts/Requests/movie_requests/create-movie-request';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  public movies: Observable<Movie[]>;
  public single: any;
  public newMovie;

  constructor(
    private movieService: MovieService,
    private route: Router,
  ) { }

  ngOnInit(): void {
    this.movies = this.movieService.allMovies();

    this.movieService.createdMovie$.subscribe((movie) => {
      console.log('Received notification of an updated movie');
      this.newMovie = movie;
    });
  }

  public onClick(id: number): void {
    this.route.navigate(['../', 'movie', id]);
  }
}
