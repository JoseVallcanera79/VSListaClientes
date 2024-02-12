import { Component, Input, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  @Input() cliente: Cliente;
  titulo: string = "Detalle del cliente";
  fotoSeleccionada: File;
  activateRoute: any;
  progreso: any;
  clienteSeleccionado: any;
  subidaSubscripcion: Subscription;


  constructor(private clienteService: ClienteService, activatedRoute: ActivatedRoute) {
    this.activateRoute = activatedRoute;
  }

  ngOnInit() {
     this.activateRoute.paramMap.subscribe(params =>{
      let id: number = +params.get('id');
      if(id){
        this.clienteService.getCliente(id).subscribe(cliente => {
          this.cliente = cliente;
        });
      }
     });
     console.log(this.cliente);


  }

  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    console.log(this.fotoSeleccionada);
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {

      Swal.fire('Error seleccionar imagen: ', 'El archivo debe ser tipo imagen', 'error');
      this.fotoSeleccionada = null;

    }
  }

  /*   subirFoto(){
  
      if(!this.fotoSeleccionada){
         Swal.fire('Error Upload: ', 'Debe seleccionar una foto',  'error');
       }else{
           this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id,)
       .subscribe(cliente =>{
         
  
  
        this.cliente = cliente;
         Swal.fire('La foto se ha subido completamente', `La foto ${this.cliente.foto} se ha subido con exito!`, 'success')
       })
    } 
  } */







  subirFoto() {
    if (!this.fotoSeleccionada) {
      Swal.fire('Error Upload: ', 'Debe seleccionar una foto', 'error');
    } else {
      this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id)
        .subscribe(
          //ACTUALIZA INMEDIATA DE LA FOTO EN EL NAVEGADOR
          (response: any) => { // Cambia el tipo de respuesta a "any" o al tipo correcto de tu respuesta
            // Actualizar la propiedad "foto" del cliente con la nueva URL de la foto
            this.cliente.foto = response.foto; // Asume que la respuesta JSON tiene una propiedad "foto" con la nueva URL

          


            // Simular la barra de progreso manualmente
            let progreso = 0;
            const interval = setInterval(() => {
              progreso = progreso + 10; // Incrementar manualmente el progreso
              if (progreso <= 100) {
                this.progreso = progreso;
              } else {
                clearInterval(interval); // Detener el intervalo cuando se alcanza el 100%
              }
            }, 200); // Cambiar el valor de intervalo según sea necesario

           
            Swal.fire('La foto se ha subido completamente', `La foto ${this.cliente.foto} se ha subido con éxito`, 'success');
          },
          error => {
            console.error(error);
            Swal.fire('Error al subir foto del cliente', 'Ha ocurrido un error al subir la foto', 'error');
          }
        );


    }
  }


  cerrarModal() {
    this.cliente = null;
    window.location.reload();
   
  }
   





}
