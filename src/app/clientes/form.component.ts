import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
  
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente()
  public titulo: string = "Crear Cliente"

  constructor(){ }

    ngOnInit(){
   
      }



 public create(): void {
console.log("clicked!")
console.log(this.cliente)
}


}
