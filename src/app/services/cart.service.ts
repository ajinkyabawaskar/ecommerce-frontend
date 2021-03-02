import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CartService {
    items = [];

    constructor(private http: HttpClient){
      
    }
    
    addProductToCart(product:any){
      return this.http.post(`${environment.apiUrl}/cart/`,product)
    }

    removeProductFromCart(product:any){
      return this.http.put(`${environment.apiUrl}/cart/`,product)
    }

    clearCarts(){
      return this.http.delete(`${environment.apiUrl}/cart/`)
    }
  
    getItems() {
      return this.http.get(`${environment.apiUrl}/cart/`).pipe(map(products => {
        console.log(products);
        return products;
      }));
    }
  
    clearCart() {
      this.items = [];
      return this.items;
    }

}