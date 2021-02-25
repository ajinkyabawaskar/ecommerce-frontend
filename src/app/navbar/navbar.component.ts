import {Component, OnDestroy, ChangeDetectorRef, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { Router } from '@angular/router';
import {UserService} from '../services/user-service.service';
import {User} from '../models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnDestroy, OnInit {

  currentUser: User;
  collapsed : boolean = true;
  loggedIn: boolean = true;

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public router: Router, public userService: UserService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    if(this.userService.currentUserValue === null) {
      this.loggedIn = false;
    }
    this.userService.loginEvent.subscribe((loggedIn) => this.loggedIn = loggedIn);
  }

  ngOnInit() : void {

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/signin']);
  }

}
