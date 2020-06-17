import { Component, OnInit } from '@angular/core';
import { WebSocketAPIService } from './services/web-socket-api.service';
import { SimuladorService } from './services/simulador.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-client: Esta es una app angular';
  webSocketAPI: WebSocketAPIService;
  simulador: SimuladorService;
  greeting: string;
  name: string;
  status: any;

  entidades = [];

  acumulacion = [];
  bilateral = [];
  multilateral = []  ;

  arregloConsolidado = [];

  arregloBilateral = [];

  arregloMultilateral = [];
  //base = 6;


  tieneMultilateral = false;
  caminoMultilateral = [];
  indicesCaminoMultilateral = [];
  numTransacciones = 0;
  milis = 0;
  estadoSimulacionAutomatica = false;

  constructor(simuladorService: SimuladorService) {
    this.simulador = simuladorService;
  }



  showArrays(){
    this.llenarAcumulado();
    this.llenarBilateral();
    if (this.multilateral != null){
      this.llenarMultilateral();
      this.tieneMultilateral = true;
    }else{
      this.tieneMultilateral = false;
    }
  }

  llenarAcumulado(){
    const nuevoArreglo = [];
    // tslint:disable-next-line: one-variable-per-declaration
    let i, j;
    //this.base = this.acumulacion.length;
    for (i = 0; i < this.acumulacion.length; i++) {
      let fila = [];
      fila = this.acumulacion[i];
      for (j = 0; j < fila.length; j++){
        nuevoArreglo.push(fila[j]);
      }
    }
    this.arregloConsolidado = [];
    this.arregloConsolidado = nuevoArreglo;
  }
  llenarBilateral(){
    const nuevoArreglo = [];
    // tslint:disable-next-line: one-variable-per-declaration
    let i, j;
    for (i = 0; i < this.bilateral.length; i++) {
      let fila = [];
      fila = this.bilateral[i];
      for (j = 0; j < fila.length; j++){
        nuevoArreglo.push(fila[j]);
      }
    }
    this.arregloBilateral = []
    this.arregloBilateral = nuevoArreglo;
  }
  llenarMultilateral(){
    const nuevoArreglo = [];
    // tslint:disable-next-line: one-variable-per-declaration
    let i, j;
    for (i = 0; i < this.multilateral.length; i++) {
      let fila = [];
      fila = this.multilateral[i];
      for (j = 0; j < fila.length; j++){
        nuevoArreglo.push(fila[j]);
      }
    }
    this.arregloMultilateral = []
    this.arregloMultilateral = nuevoArreglo;
  }

  llenarCamino(array){
    this.caminoMultilateral = [];
    this.indicesCaminoMultilateral = [];
    if(array != null){
      // tslint:disable-next-line: one-variable-per-declaration
      let i, j;
      for (i = 0; i < array.length; i++) {
        let fila = [];
        fila = array[i];
        for (j = 0; j < fila.length; j++){
          this.caminoMultilateral.push(fila[j]);
          if( j + 1 < fila.length){
            this.indicesCaminoMultilateral.push((this.acumulacion.length * fila[j]) + fila[j + 1]);
          }
        }
        if ( i + 1 < array.length){
          this.caminoMultilateral.push(' --- ');
        }
      }
    }else{
      this.caminoMultilateral = [];
      this.indicesCaminoMultilateral = [];
    }
  }


  ngOnInit() {
    this.webSocketAPI = new WebSocketAPIService(this);
    this.greeting = 'Invitado';
    this.webSocketAPI._connect();
    this.actualizarEstadoSimulacion();
    //console.log(this.simulador.getSimulacionAutomatica());

  }

  connect(){
    this.webSocketAPI._connect();
  }

  disconnect(){
    this.webSocketAPI._disconnect();
  }

  sendMessage(){
    this.webSocketAPI._send('Conectado');
  }
  reset(){
    this.greeting = '';
  }

  handleMessage(message: any){
    console.log('Handled message ' + message);
    if(JSON.parse(message).hasOwnProperty('acumulacion')){
      this.acumulacion = JSON.parse(message).acumulacion;
      this.bilateral = JSON.parse(message).bilateral;
      this.multilateral = JSON.parse(message).multilateral;
      this.llenarCamino(JSON.parse(message).caminoMultilateral);
      this.numTransacciones = JSON.parse(message).numTransacciones;
      this.entidades = JSON.parse(message).entidades;
      this.milis = JSON.parse(message).milis;
      this.showArrays();
    }else{
      this.greeting = JSON.parse(message).content;

    }
  }

  iniciarSimulacion(){
    this.simulador.getIniciarSimulacionAutomatica().subscribe((res: any) => {});
    this.actualizarEstadoSimulacion();
  }
  detenerSimulacion(){
    this.simulador.getDetenerSimulacionAutomatica().subscribe((res: any) => {});
    this.actualizarEstadoSimulacion();
  }
  pasoAPaso(){
    this.simulador.getPasoAPaso().subscribe((res: any) => {});
  }

  reestablecer(){
    this.simulador.reestablecer().subscribe((res: any) => {});
  }

  actualizarEstadoSimulacion(){
    this.simulador.getSimulacionAutomatica().subscribe((res: any) => {
      this.estadoSimulacionAutomatica = res;
    });
  }
}
