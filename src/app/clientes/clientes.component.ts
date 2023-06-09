import { Component } from '@angular/core';
import { Cliente } from './cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent {
  clientes: Cliente[] = [
    {id:1, nombre:'Jose', apellido:'Vallcanera', email:'joseV@gmail.com', createAt:'2023-06-09'},
   { id: 2,nombre: "María", apellido: "López",email: "marialopez@gmail.com",createAt: "2023-04-20"},
  {id: 3,nombre: "Carlos",apellido: "Rodríguez",email: "carlosr@gmail.com", createAt: "2023-06-01"},
  {id: 4,nombre: "Laura",apellido: "García", email: "laurag@gmail.com", createAt: "2023-03-10"},
  {id: 5,nombre: "Ana", apellido: "Martínez", email: "anamartinez@gmail.com",createAt: "2023-06-05"},
  {id: 6,nombre: "Pedro",apellido: "Gómez", email: "pedrogomez@gmail.com", createAt: "2023-02-18"},
  {id: 7,nombre: "Sofía",apellido: "Hernández",email: "sofiah@gmail.com",createAt: "2023-07-11"},
  {id: 8,nombre: "Miguel",apellido: "Torres",email: "migueltorres@gmail.com",createAt: "2023-09-02"},
  {id: 9,nombre: "Isabel",apellido: "Vargas", email: "isabelvargas@gmail.com", createAt: "2023-08-27"},
  {id: 10,nombre: "Luis", apellido: "Ramírez", email: "luisramirez@gmail.com", createAt: "2023-11-30"},
  {id: 11,nombre: "Elena",apellido: "Fernández",email: "elenaf@gmail.com", createAt: "2023-10-09"},
  {id: 12, nombre: "Gabriel",apellido: "Ortega",email: "gabrielortega@gmail.com",createAt: "2023-12-15"}
  
  ]
}
