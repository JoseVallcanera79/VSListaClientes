import { Injectable } from '@angular/core';
import {  CommonModule, DatePipe } from '@angular/common';
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndpoint: string = 'http://localhost:8080/api/clientes';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  clienteService: any;
  cliente: any;
  progreso: number;
  constructor(private http: HttpClient, private router: Router, private datePipe: DatePipe, private comon: CommonModule) {
      this.datePipe = new DatePipe('es');

   }

  getClientes(page:number): Observable<any> {
    //return of(CLIENTES);
    //LOS TAP VAN POR ORDEN DE ARRIBA ABAJO
    return this.http.get(this.urlEndpoint + '/page/' + page).pipe(
      tap((response: any) =>{
        console.log('ClienteService: tap 1');
        (response.content as Cliente[]).forEach(cliente =>{
          console.log(cliente.nombre)
        }

        )
      }),
      map((response:any) => {
        (response.content as Cliente[]).map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          cliente.apellido = cliente.apellido.charAt(0).toUpperCase() + cliente.apellido.slice(1); //primera letra Mayuscula y las siguientes minusculas.
          //cliente.createAt = this.datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy');//formatos fecha en captura en buscador web ejemplo='fullDate'
          return cliente;
        });
        return response;
      }),

      tap(response =>{
        console.log('ClienteService: tap 2');

        (response.content as Cliente[]).forEach(cliente =>{
          console.log(cliente.nombre)
        }

        )
      })
      
      );
    

  }
  //LO LLEVAMOS AL COMPONENTE
  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post(this.urlEndpoint, cliente, { headers: this.httpHeaders }).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {

        if (e.status == 400) {
          return throwError(e);
        }


        console.error(e.error.mensaje);
        Swal.fire('Error al crear el cliente', e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }

  getCliente(id): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndpoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    )

  }

  //LO LLEVAMOS AL COMPONENTE
  update(cliente: Cliente): Observable<any> {
    return this.http.put<any>(`${this.urlEndpoint}/${cliente.id}`, cliente, { headers: this.httpHeaders }).pipe(
      catchError(e => {

        if (e.status == 400) {
          return throwError(e);
        }

        console.error(e.error.mensaje);
        Swal.fire('Error al editar el cliente', e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }


  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndpoint}/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire('Error al eliminar el cliente', e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }

  subirFoto(archivo: File, id): Observable<Cliente>{
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);
    return this.http.post(`${this.urlEndpoint}/upload`, formData).pipe(
      map((response: any)=> response.cliente as Cliente),
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire('Error al subir foto del cliente', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  } 


  


  

}
