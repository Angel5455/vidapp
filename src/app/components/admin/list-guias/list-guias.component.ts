import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../../services/data-api.service';
import { GuiaInterface } from '../../../models/guias';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInterface } from '../../../models/user';

@Component({
  selector: 'app-list-guias',
  templateUrl: './list-guias.component.html',
  styleUrls: ['./list-guias.component.css']
})
export class ListGuiasComponent implements OnInit {

  constructor(private dataApi: DataApiService, private authService: AuthService) { }

  private guias: GuiaInterface[];
  public isAdmin: any = null;
  public userUid: string = null;
  public zona2=[]

  ngOnInit() {
    this.getListGuias();
    // this.getCurrentUser();
  }

  // getCurrentUser() {
  //   this.authService.isAuth().subscribe(auth => {
  //     if (auth) {
  //       this.userUid = auth.uid;
  //       this.authService.isUserAdmin(this.userUid).subscribe(userRole => {
  //         this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty('admin');
  //         // this.isAdmin = true;
  //       })
  //     }
  //   })
  // }
  getListGuias() {
    this.dataApi.getAllGuias()
      .subscribe(guias => {
        this.guias = guias;
      });
  }

  onEliminarGuia(idGuia: string): void {
    const confirmacion = confirm('Estas seguro de eliminar el registro del Guia?');
    if (confirmacion) {
      this.dataApi.EliminarGuia(idGuia);
    }
  }

  onModificarGuia(guia: GuiaInterface) {
    console.log('guia', guia);

    this.dataApi.selectedGuia = Object.assign({}, guia);
  }



}
