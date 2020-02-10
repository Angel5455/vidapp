import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { GuiaInterface } from '../models/guias';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor(private afs: AngularFirestore) {

     this.guiasCollection = this.afs.collection<GuiaInterface>('guias');
     this.guias = this.guiasCollection.valueChanges();


  }

private guiasCollection: AngularFirestoreCollection<GuiaInterface>;
private guias: Observable<GuiaInterface[]>;
private guiaDoc: AngularFirestoreDocument<GuiaInterface>;
private guia: Observable<GuiaInterface>;
public selectedGuia: GuiaInterface = {
  id: null
};

public zona2= [];

  getAllGuias(){
    this.guiasCollection = this.afs.collection<GuiaInterface>('guias');
  return this.guias = this.guiasCollection.snapshotChanges()
    .pipe(map(changes => {
      return changes.map(action => { // el map sirve para agregar un campo mas para ver en el arreglo
        const data = action.payload.doc.data() as GuiaInterface;
        data.id = action.payload.doc.id;
        return data; // con este codigo obtenemos el id del guia (documento en firebase)

      });
    }));

  }

  getOneGuia(idGuia:string){
    this.guiaDoc = this.afs.doc<GuiaInterface>(`guias/${idGuia}`);
    return this.guia = this.guiaDoc.snapshotChanges().pipe(map(action => {
        if (action.payload.exists === false) {
          return null;
        } else {
        const data = action.payload.data() as GuiaInterface;
        data.id = action.payload.id;

        return data;
          }
        }));
  }


  AñadirGuia(guia: GuiaInterface):void{
    this.guiasCollection.add(guia);
    // console.log(this.zona2)
  }

  ModificarGuia(guia: GuiaInterface):void{
    let idguia = guia.id;
    this.guiaDoc = this.afs.doc<GuiaInterface>(`guias/${idguia}`);
    this.guiaDoc.update(guia);
  }

  EliminarGuia(idguia: string):void{
    this.guiaDoc = this.afs.doc<GuiaInterface>(`guias/${idguia}`);
    this.guiaDoc.delete();
  }




}
