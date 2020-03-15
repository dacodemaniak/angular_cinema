import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListMovieComponent} from './Movie/list-movie/list-movie.component';
import { SingleMovieComponent } from './movie/single-movie/single-movie.component';
import { TopNavComponent } from './nav/top-nav/top-nav.component';
import { SideNavComponent } from './nav/side-nav/side-nav.component';



@NgModule({
  declarations: [ListMovieComponent, SingleMovieComponent, TopNavComponent, SideNavComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ListMovieComponent,
    SingleMovieComponent,
    TopNavComponent,
    SideNavComponent
  ]
})
export class UiModule { }
