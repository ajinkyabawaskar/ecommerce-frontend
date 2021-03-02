import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from '../services/product.service';
import {first} from 'rxjs/operators';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products : any[];
  error: string;
  isLoading: boolean = true;
  @Input() category : string;

  constructor( private productService: ProductService, private router : Router,private cartService:CartService ){

  }

  ngOnInit(): void {
    this.getProductsByCategory(this.category);
  }

  addToCart(product:any){
    console.log(product);
    this.cartService.addProductToCart(product).subscribe({
      next:(msg)=>{
        console.log(msg);
      },
      error:error=>{
        console.log(error);
      }
    })
  }

  getProductsByCategory(category: string) {
    this.productService.getProductsByCategory(category)
      .pipe(first())
      .subscribe({
        next: (products) => {
          this.products = products;
        },
        error: error => {
          if (error === 'Access Denied') {
            this.error = 'JWT invalidated, log in again';
          }
          else {
            this.error = 'Something went wrong';
          }
        }
      });

  }

  viewProduct(name: string) {
    let currentUrl = '/view-product/' + name;
    this.router.routeReuseStrategy.shouldReuseRoute = function(){return false;};  
    this.router.navigateByUrl(currentUrl)
      .then(() => {
        this.router.navigated = false;
        this.router.navigate([this.router.url]);
      });
  }
}
