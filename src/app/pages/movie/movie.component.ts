import { Component, OnInit } from '@angular/core';
import {MovieService} from '../../core/service/movie.service';
import {ActivatedRoute} from '@angular/router';
import {Movie} from '../../core/model/movie';
import {UpdateMovieRequest} from '../../core/Contracts/Requests/movie_requests/update-movie-request';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.sass']
})
export class MovieComponent implements OnInit {
  public singleMovie: Movie;
  public update; 
  constructor(
    public activeRoute: ActivatedRoute,
    public movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((paramMap: any) => {
      this.movieService.singleMovie(paramMap.params.id).subscribe((movie: any) => {
        this.singleMovie = movie;
      });
    });

    this.movieService.updatedMovie$.subscribe((updateMovie: UpdateMovieRequest) => {
      console.log('Received notification of an updated movie');
      this.update = updateMovie;
    });
  }

}
