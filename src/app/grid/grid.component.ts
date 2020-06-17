import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styles: [
  ]
})
export class GridComponent implements OnInit {

  appComponent: AppComponent;

  constructor( appComponent: AppComponent) { 

    this.appComponent = appComponent;
  }



  ngOnInit(): void {
  }

  getClass(index, value){
    if(this.getCoordenadaX(index) === this.getCoordenadaY(index)){
      return 'cellsiminvalid';
    }else{
        let estaEnMulti = false;
        let i;
        for ( i = 0; i < this.appComponent.indicesCaminoMultilateral.length; i++){
          if ( this.appComponent.indicesCaminoMultilateral[i] === index ){
            estaEnMulti = true;
            break;
          }
        }
        if ( estaEnMulti ){
          return 'cellsimmulti';
        }else{
          if (value === 0){
            return 'cellsimwithoutvalue';
          }else{
            return 'cellsimwithvalue';
          }
        }
      
    }
 }

 styleMatrix(): Object {
  return {display: 'grid', 'grid-gap': '2px', 'grid-template-columns': 'repeat('+this.appComponent.acumulacion.length+', 90px)'}
}
 getCoordenadaX(index){
   return index % this.appComponent.acumulacion.length;

 }
 getCoordenadaY(index){
  return Math.floor(index / this.appComponent.acumulacion.length);
}

}
