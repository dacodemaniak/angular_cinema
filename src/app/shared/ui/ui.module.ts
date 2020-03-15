import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListMovieComponent} from './Movie/list-movie/list-movie.component';
import { SingleMovieComponent } from './movie/single-movie/single-movie.component';
import { TopNavComponent } from './nav/top-nav/top-nav.component';
import { SideNavComponent } from './nav/side-nav/side-nav.component';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './nav/top-nav/search/search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ResultComponent } from './nav/top-nav/search/result/result.component';



@NgModule({
  declarations: [
    ListMovieComponent, 
    SingleMovieComponent, 
    TopNavComponent, 
    SideNavComponent, SearchComponent, ResultComponent, 
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    ListMovieComponent,
    SingleMovieComponent,
    TopNavComponent,
    SideNavComponent,
  ]
})
export class UiModule { }
