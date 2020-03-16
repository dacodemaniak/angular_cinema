import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Movie} from '../../../../core/model/movie';
import {CreateMovieRequest} from '../../../../core/Contracts/Requests/movie_requests/create-movie-request';
import {MovieService} from '../../../../core/service/movie.service';

@Component({
  selector: 'app-list-movie',
  templateUrl: './list-movie.component.html',
  styleUrls: ['./list-movie.component.scss']
})
export class ListMovieComponent implements OnInit {
  
  constructor(
    private movieService: MovieService
  ) { }

  @Input() item: Movie;

  ngOnInit(): void {

  }
}
