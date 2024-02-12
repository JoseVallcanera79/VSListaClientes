import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Region } from './region';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'

})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente()
  regiones: Region[];
  public titulo: string = "Crear Cliente"
  public errores: string[];
 

  constructor(private clienteService: ClienteService,
    private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
   this.editarCliente()

   this.clienteService.getRegiones().subscribe(regiones => this.regiones = regiones);
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
    //para ver en consola con f12 (console.log)
    console.log(this.cliente)
    this.clienteService.create(this.cliente)
      .subscribe(cliente => {
        this.router.navigate(['/clientes'])
        Swal.fire('Nuevo cliente', `Cliente ${cliente.nombre} ${cliente.apellido} creado con éxito!`, 'success')
      },
      err => {
        this.errores = err.error.errores as string[];
        console.error('Código de error desde el backend: ' + err.status);
        console.error(err.error.errores);
      }
      );
 }
 //LO TRAEMOS DEL JSON DEL SERVICIO
  update(): void{
    console.log(this.cliente)

    this.clienteService.update(this.cliente)
    .subscribe(json =>{
      this.router.navigate(['/clientes'])
      Swal.fire('Cliente Actualizado', `Cliente ${json.cliente.nombre} ${json.cliente.apellido} actualizado con éxito!`, 'success')
    },
    err => {
      this.errores = err.error.errores as string[];
      console.error('Código de error desde el backend: ' + err.status);
      console.error(err.error.errores);
    }
    );
    
  }

  compararRegion(o1:Region, o2:Region): boolean{
    if(o1 === undefined && o2 === undefined){
      return true;
    }
     return o1 === null || o2=== null || o1 === undefined || o2=== undefined ? false: o1.id===o2.id;
  }



}
