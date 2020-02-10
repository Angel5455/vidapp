import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';


import { Observable } from 'rxjs/internal/Observable';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-register-page',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('imageUser', {static: true})  inputImageUser: ElementRef;

  

  public email: string;
  public password: string;


  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  constructor(  private authService: AuthService,
                private router: Router,
                private storage: AngularFireStorage
              ) { }

  ngOnInit() {
  }

  onSubmitAddUser() {
    this.authService.registerUser(this.email, this.password)
    .then((resp) => {
      // this.flashMensaje.show('Usuario creado correctamente.',
      // {cssClass: 'alert-success', timeout: 4000});
     this.router.navigate(['admin/list-guias']);
    }).catch( (err) => {
      // this.flashMensaje.show(err.message,
      // {cssClass: 'alert-danger', timeout: 4000});
    });
  }

  onAddUser() {
  this.authService.registerUser(this.email, this.password)
    .then((res) => {
      this.authService.isAuth().subscribe(user => {
        if (user) {
          user.updateProfile({
            displayName: '',
            photoURL: this.inputImageUser.nativeElement.value
          }).then(() => {
            this.router.navigate(['admin/list-books']);
          }).catch((error) => console.log('error', error));
        }
      });
    }).catch(err => console.log('err', err.message));
}

  onUpload(e){
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `upload/profile_${id}`;
    const ref = this.storage.ref(filePath)
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe( finalize ( () => this.urlImage = ref.getDownloadURL())).subscribe();


  }

}
