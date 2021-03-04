import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { ProductService } from '../services/product.service';
import {CartService} from '../services/cart.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {


  public id: string;
  public product: any;
  public error: string;

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, private router: Router, private cartService: CartService) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }


  ngOnInit(): void {

    this.productService.getProductById(this.id)
      .pipe(first())
      .subscribe({
        next: (product) => {
          this.product = product;
        },
        error: error => {
          if (error === 'Access Denied') {
            this.error = 'Incorrect username or password';
          } else {
            this.error = 'Something went wrong';
          }
        }
      });
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
}
