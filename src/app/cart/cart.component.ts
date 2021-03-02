import {Component, OnInit} from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  products:any;

  constructor(private cartservice:CartService) {
  }

  removeProduct(product){
    this.cartservice.removeProductFromCart(product).subscribe({
      next:(products)=>{
        let prods=this.products.filter((prod)=>prod.pid!=product.pid);
        this.products=prods;  
      
      },
      error:error=>{
        console.log(error);
      }
    }  )
    
   
  }
  clearAll(){
    this.cartservice.clearCarts
  }

  ngOnInit(): void {

    this.cartservice.getItems().subscribe(
      {
        next:(products)=>{
          console.log(products);
          this.products=products;
        },
        error:error=>{
          console.log(error);
        }
      }      
    )

  }

}
