import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../services/user-service.service';
import { User } from '../models/user.model';
import { first } from 'rxjs/operators';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent  implements OnInit {

  isLinear = false;

  uploadMessage: string = 'Choose Avatar';
  loginForm: FormGroup;
  user: User;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) {
    // redirect to home if already logged in
    if (this.userService.currentUserValue) {
      this.router.navigate(['/shop']);
    }
    this.user = new User();
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      imagePath: ['', Validators.required],
      email: ['', Validators.required],
      name: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    let formData = new FormData();
    formData.append('file', this.loginForm.get('imagePath').value);
    formData.append('username', this.user.username);
    formData.append('password', this.user.password);
    formData.append('email', this.user.email);
    formData.append('name', this.user.name);
    this.loading = true;

    this.userService.signup(formData)
      .pipe(first())
      .subscribe({
        next: () => {
          this.userService.login(this.user)
            .pipe(first())
            .subscribe( {
            next: () => {
              // get return url from route parameters or default to '/'
              const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
              this.router.navigate([returnUrl]);
            },
              error: (error) => {
                if(error == 'Access Denied') {
                  this.error = 'Incorrect username or password';
                }
                else {
                  this.error = 'Account created, but couldn\'t log you in!';
                }
              }
          })
        },
        error: (error) => {
          if(error == 'Access Denied') {
            this.error = 'Incorrect username or password';
          }
          else {
            this.error = 'Account created, but couldn\'t log you in!';
          }
        }
      });

  }

  upload(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.loginForm.patchValue({
      imagePath: file
    });
    this.uploadMessage = file.name;
    this.loginForm.get('imagePath').updateValueAndValidity()
  }

  req = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);

  getUsernameErrorMessage() {
    if (this.req.hasError('required')) {
      return 'Please enter your username!';
    }
    return this.req.hasError('username') ? 'Not a valid username' : '';
  }

  getPasswordErrorMessage() {
    if (this.req.hasError('required')) {
      return 'Please enter your password!';
    }
    return this.req.hasError('password') ? 'Something wrong with your password.' : '';
  }

  getNameErrorMessage() {
    if (this.req.hasError('required')) {
      return 'Please enter your name!';
    }
    return this.req.hasError('password') ? 'Something wrong with your name.' : '';
  }

  getEmailErrorMessage() {
    if(this.email.hasError('required')) {
      return 'Please enter your email!';
    }
    return this.email.hasError('email') ? 'Please enter a valid email.' : '';
  }

  openFileBrowser(event) {
    event.preventDefault();
    event.stopPropagation();

    let element: HTMLElement = document.getElementById('imagePath') as HTMLElement;
    element.click();

  }
}
