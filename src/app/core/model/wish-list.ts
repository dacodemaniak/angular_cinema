import {Movie} from './movie';

export class WishList {
  public Movie: Movie

  public deserialize(datas: any): WishList {
    Object.assign(this, datas);
    return this;
  }
}
