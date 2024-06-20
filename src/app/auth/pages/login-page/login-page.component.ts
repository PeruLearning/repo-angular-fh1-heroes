import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'auth-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  constructor(
    private service: AuthService,
    private router: Router
  ) {}

  public onLogin(): void {
    this.service.login('edinson@gmail.com', '123456')
      .subscribe(user => {
        this.router.navigateByUrl('/');
      });
  }

}
