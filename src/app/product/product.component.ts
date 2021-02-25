import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from '../services/product.service';
import {first} from 'rxjs/operators';

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

  constructor( private productService: ProductService) {

  }

  ngOnInit(): void {
    this.getProductsByCategory(this.category);
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

}
