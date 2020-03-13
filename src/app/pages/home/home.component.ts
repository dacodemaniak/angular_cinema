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
  public  movies: Observable<Movie[]>;
  public single: any;

  constructor(
    private movieService: MovieService,
    private route: Router,
  ) { }

  ngOnInit(): void {
    this.movies = this.movieService.allMovies();
  }

  public onClick(id: number): void {
    this.route.navigate(['../', 'movie', id]);
  }
}
