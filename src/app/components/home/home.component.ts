import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public guias = [];
  public guia = '';

  constructor(private dataApi: DataApiService) { }

  ngOnInit() {
    this.dataApi.getAllGuias().subscribe(guias => {
      console.log('GUIAS', guias);
      this.guias = guias;
    })
  }

}
