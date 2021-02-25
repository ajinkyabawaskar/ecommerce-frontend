import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from 'src/environments/environment';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) {

  }

  getCategories() {
    return this.http.get<any>(`${environment.apiUrl}/product/category/`)
      .pipe(map(categories => {
        return categories.reverse();
      }));
  }


  getProducts() {
    return this.http.get<any>(`${environment.apiUrl}/all/`)
      .pipe(map(products => {
        console.log(products);
        return products;
      }));
  }

  getProductsByCategory(category: string) {
      return this.http.get<any>(`${environment.apiUrl}/product/category/${category}`).pipe(
        map(
          products => {
            return products;
          }
        )
      );
  }
}
