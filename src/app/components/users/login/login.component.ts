import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: string;
  public password: string;

  constructor(public authService: AuthService,
              public router: Router,
              public flashMensaje: FlashMessagesService
              ) { }

  ngOnInit() {
  }

  onSubmitLogin() {
   this.authService.loginEmail(this.email, this.password)
   .then( (resp) => {
     this.flashMensaje.show('Usuario logado correctamente.',
     {cssClass: 'alert-success', timeout: 4000});
     this.router.navigate(['/admin/list-guias']);
   }).catch((err) => {
     this.flashMensaje.show(err.message,
     {cssClass: 'alert-danger', timeout: 4000});
     this.router.navigate(['/user/login']);
   });
 }

 onClickGoogleLogin() {
  this.authService.loginGoogle()
   .then((resp) => {
       this.router.navigate(['/admin/list-guias']);
   }).catch( err => console.log(err.message));
 }


 onClickFacebookLogin() {
 this.authService.loginFacebook()
   .then((resp) => {
       this.router.navigate(['/admin/list-guias']);
   }).catch( err => console.log(err.message));
}



}
