import {Component, Input, OnInit} from '@angular/core';
import {Movie} from '../../core/model/movie';
import {WishService} from '../../core/service/wish.service';
import {Observable} from 'rxjs';
import {MovieService} from '../../core/service/movie.service';
import {WishList} from '../../core/model/wish-list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wish',
  templateUrl: './wish.component.html',
  styleUrls: ['./wish.component.scss']
})
export class WishComponent implements OnInit {
  public wishMovies: Observable<WishList[]>;
  public movie: Movie;

  constructor(
    private  movieService: MovieService,
    private wishService: WishService,
    private route: Router,
  ) { }

  ngOnInit(): void {
    this.wishMovies = this.wishService.allWishedMovies();
    console.log(JSON.stringify(this.wishMovies));

  }

  public onClick(id: number): void {
    this.route.navigate(['../', 'movie', id]);
  }

}
