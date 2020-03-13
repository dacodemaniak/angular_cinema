import {Component, Input, OnInit} from '@angular/core';
import {Movie} from '../../core/model/movie';
import {WishService} from '../../core/service/wish.service';
import {Observable} from 'rxjs';
import {MovieService} from '../../core/service/movie.service';
import {WishList} from '../../core/model/wish-list';

@Component({
  selector: 'app-wish',
  templateUrl: './wish.component.html',
  styleUrls: ['./wish.component.sass']
})
export class WishComponent implements OnInit {
  public wishMovies: Observable<WishList[]>;
  public singleMovie: Movie;

  constructor(
    private  movieService: MovieService,
    private wishService: WishService
  ) { }

  ngOnInit(): void {
    this.wishMovies = this.wishService.allWishedMovies();
    console.log(JSON.stringify(this.wishMovies));
  }
}
