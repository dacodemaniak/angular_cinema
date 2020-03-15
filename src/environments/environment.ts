// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:50964/api/v1',
  authentication: 'http://localhost:50964/api/v1/identity/login',
  register: 'http://localhost:50964/api/v1/identity/register',
  movieRoot: 'http://localhost:50964/api/v1/movie/',
  movieSearch: 'http://localhost:50964/api/v1/movie/search/',
  personRoot: 'http://localhost:50964/api/v1/person/',
  commentRoot: 'http://localhost:50964/api/v1/comment/',
  ratingRoot: 'http://localhost:50964/api/v1/raiting/',
  wishList: 'http://localhost:50964/api/v1/myWishlist'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
