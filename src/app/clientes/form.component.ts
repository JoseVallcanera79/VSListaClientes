import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'

})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente()
  public titulo: string = "Crear Cliente"
  public errores: string[];

  constructor(private clienteService: ClienteService,
    private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
   this.editarCliente()
  }


  editarCliente(): void{
this.activatedRoute.params.subscribe(params => {
  let id = params['id']
  if(id){
    this.clienteService.getCliente(id).subscribe( (cliente) => this.cliente = cliente)
  }
 
})
  }


  //LO TRAEMOS DEL CLIENTE SERVICIO
   create(): void {
    this.clienteService.create(this.cliente)
      .subscribe(cliente => {
        this.router.navigate(['/clientes'])
        Swal.fire('Nuevo cliente', `Cliente ${cliente.nombre} ${cliente.apellido} creado con éxito!`, 'success')
      },
      err => {
        this.errores = err.error.errores as string[];
        console.error('Código de erro desde el backend: ' + err.status);
        console.error(err.error.errores);
      }
      );
 }
 //LO TRAEMOS DEL JSON DEL SERVICIO
  update(): void{
    this.clienteService.update(this.cliente)
    .subscribe(json =>{
      this.router.navigate(['/clientes'])
      Swal.fire('Cliente Actualizado', `Cliente ${json.cliente.nombre} ${json.cliente.apellido} actualizado con éxito!`, 'success')
    },
    err => {
      this.errores = err.error.errores as string[];
      console.error('Código de erro desde el backend: ' + err.status);
      console.error(err.error.errores);
    }
    );
    
  }



}
