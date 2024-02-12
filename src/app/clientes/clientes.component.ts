import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})

export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  paginador: any;
  clienteSeleccionado:Cliente;

  constructor(private clienteService: ClienteService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    
    this.activatedRoute.paramMap.subscribe(params => {
      let page:number = +params.get('page');
      if(!page){
        page = 0;
      }
      this.clienteService.getClientes(page).pipe(
        tap(response => {
          console.log('ClientesComponent: tap 3');
          (response.content as Cliente[]).forEach(cliente => {
            console.log(cliente.nombre)
          });


        })
      ).subscribe(response => { 
        
        this.clientes = response.content as Cliente[];
        this.paginador = response;
      
      });

    });
   
  }

   
  
    isIdPar(id: number): boolean {
     // Devuelve true si el ID es par, de lo contrario, devuelve false.
       return id % 2 === 0;
    }
  
  


  delete(cliente: Cliente): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Está seguro?',
      text: `Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.clienteService.delete(cliente.id).subscribe(
          reponse => {

            this.clientes = this.clientes.filter(cli => cli !== cliente)

            swalWithBootstrapButtons.fire(
              'Cliente eliminado!',
              `Cliente ${cliente.nombre} ${cliente.apellido}  eliminado correctamente.`,
              'success'
            )
          }
        )

      }
    }
    )


  }


  abrirModal(cliente:Cliente){
    this.clienteSeleccionado = cliente;
  }
}
