import { Component, OnInit } from '@angular/core';
import { catchError, Subscription, throwError } from 'rxjs';
import { User } from 'src/app/models/User';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/service/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  users: User = new User();
  private mySubscription: Subscription | null = null;  // Initialized as null
  constructor(private loaderService: LoaderService,
    private service: ApiService, private authService: AuthService, private router: Router) { }
  errormsg = '';
  showPassword = false;
  errortitle = 'ALERT';
  ngOnInit(): void {

  }

  onSubmit() {
    if (this.users.email && this.users.password) {
      this.loaderService.show();
      this.mySubscription = this.service.login(this.users).pipe(
        catchError(err => {
          if (err.status === 400) {
            this.errormsg = err.error.message;
            this.openModal();
          } else {
            this.errormsg = err.error.message;
            this.openModal();
          }
          this.loaderService.hide();
          return throwError(() => new Error(err));
        })
      ).subscribe(
        response => {
          this.errormsg = '';
          //let token_secret = process.env['token_secret'] || "";
          //const encryptedToken = CryptoJS.AES.encrypt(x.data.access_token, token_secret).toString();
          localStorage.setItem('token', response.token);
          // this.mySubscription = this.service.GetProfile().subscribe(x => {
          //   //console.log(encryptedToken);
          this.authService.login(response.email);
          this.router.navigate(['/']); // Redirect to home or wherever after login
          // })
        },
        error => {
          console.log('Error:', error);
        }
      );
    }
  }

  isModalOpen = false;
  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
}
