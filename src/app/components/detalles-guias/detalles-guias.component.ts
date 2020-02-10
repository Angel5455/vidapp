import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { ActivatedRoute } from '@angular/router';
import { GuiaInterface } from 'src/app/models/guias';

@Component({
  selector: 'app-detalles-guias',
  templateUrl: './detalles-guias.component.html',
  styleUrls: ['./detalles-guias.component.css']
})
export class DetallesGuiasComponent implements OnInit {

  public guia: GuiaInterface = {};

  constructor(private dataApi: DataApiService, private route: ActivatedRoute) { }

  ngOnInit() {

    const idGuia = this.route.snapshot.params['id'];
    this.getDetails(idGuia);
  }

  getDetails(idGuia: string): void {
    this.dataApi.getOneGuia(idGuia).subscribe(guia => {
      this.guia = guia;
    });
  }

}
