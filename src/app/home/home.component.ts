import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../services/user-service.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor() {
  }
}
