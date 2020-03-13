import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListMovieComponent} from './Movie/list-movie/list-movie.component';
import { SingleMovieComponent } from './movie/single-movie/single-movie.component';



@NgModule({
  declarations: [ListMovieComponent, SingleMovieComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ListMovieComponent,
    SingleMovieComponent,
  ]
})
export class UiModule { }
