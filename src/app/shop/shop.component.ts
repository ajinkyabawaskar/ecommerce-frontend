import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../models/user.model';
import {ProductService} from '../services/product.service';
import {UserService} from '../services/user-service.service';
import {first} from 'rxjs/operators';
import {LoaderService} from '../services/loader.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  currentUser: User;
  isLoading: boolean = true;
  error = '';
  categories: any[];

  constructor(private userService: UserService, private productService: ProductService, private router: Router, private loaderService: LoaderService) {
    this.userService.currentUser.subscribe(x => this.currentUser = x);
    this.loaderService.isLoading.subscribe((v) => {
      setTimeout(() => {
        this.isLoading = v;
      }, 0);
    });
  }

  ngOnInit(): void {
    this.getCategories();
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/signin']);
  }

  getCategories() {
    this.productService.getCategories()
      .pipe(first())
      .subscribe({
        next: (categories) => {
          this.categories = categories;
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
}
