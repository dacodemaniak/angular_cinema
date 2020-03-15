import { Component, OnInit, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/core/model/movie';
import { MovieService } from 'src/app/core/service/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take, map } from 'rxjs/operators';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  public movies: Movie[] = [];
  public movie: Movie;

  constructor(
    public activeRoute: ActivatedRoute,
    public movieService: MovieService,
    private route: Router,
  ) { }
  
  @Input() searchedMovies: Observable<Movie[]>

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((paramMap: any) => {
      this.movieService.singleMovie(paramMap.params.id).subscribe((movie: Movie) => {
        this.movie = movie;
      });
    });
  }

  public onClick(id: number): void {
    this.route.navigate(['../', 'movie', id]);
    this.searchedMovies = null;
  }
}
