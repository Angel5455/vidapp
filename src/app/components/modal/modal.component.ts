import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import { GuiaInterface } from '../../models/guias';
import { NgForm, FormArray, FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {



  constructor(private dataApi: DataApiService) { }
  @ViewChild('btnClose', {static:true}) btnClose: ElementRef;
  // @Input() userUid: string;
  ngOnInit() {

  }



  onGuardarGuia(GuiaForm: NgForm): void {
    if (GuiaForm.value.id == null) {
      // New
      // GuiaForm.value.userUid = this.userUid;
      this.dataApi.AñadirGuia(GuiaForm.value);

    } else {
      // Update
      this.dataApi.ModificarGuia(GuiaForm.value);

    }
    GuiaForm.resetForm();
    this.btnClose.nativeElement.click();
  }


  limpiar(GuiaForm: NgForm){
    GuiaForm.resetForm();
    this.btnClose.nativeElement.click();
  }



}
