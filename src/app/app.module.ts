import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MovieService} from './core/service/movie.service';
import { HomeComponent } from './pages/home/home.component';
import { MovieComponent } from './pages/movie/movie.component';
import { PersonComponent } from './pages/person/person.component';
import { LoginComponent } from './pages/login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import { WishComponent } from './pages/wish/wish.component';
import {JwtInterceptorService} from './core/helpers/jwt-interceptor.service';
import {WishService} from './core/service/wish.service';
import {UiModule} from './shared/ui/ui.module';
import { CreateComponent } from './pages/home/create/create.component';
import { UpdateComponent } from './pages/movie/update/update.component';
import { AccountComponent } from './pages/account/account.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MovieComponent,
    PersonComponent,
    LoginComponent,
    WishComponent,
    CreateComponent,
    UpdateComponent,
    AccountComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    UiModule,
  ],
  providers: [
    MovieService,
    WishService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
