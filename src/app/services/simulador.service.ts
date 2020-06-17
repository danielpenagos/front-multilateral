import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SimuladorService {

  private api = "http://localhost:8080";
  //private api = "http://bingodai.eastus.cloudapp.azure.com";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getPasoAPaso(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.api+ '/nuevasTransacciones');
  }

  reestablecer(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.api+ '/nuevaSimulacion');
  }

  getIniciarSimulacionAutomatica(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.api+ '/iniciarSimulacionAutomatica');
  }

  getDetenerSimulacionAutomatica(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.api+ '/detenerSimulacionAutomatica');
  }

  getSimulacionAutomatica(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.api+ '/consultarSimulacionAutomatica');
  }
}
