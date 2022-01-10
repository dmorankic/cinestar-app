import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-stavka',
  templateUrl: './stavka.component.html',
  styleUrls: ['./stavka.component.scss']
})
export class StavkaComponent implements OnInit {
  stavkaForma:FormGroup;
  constructor(private fb:FormBuilder) { }
  porcije=['S','M','L','XL']
  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.stavkaForma=this.fb.group({
      kolicina:new FormControl(1),
      porcija:new FormControl(this.porcije),
      cijena:new FormControl(3)
    });
    this.stavkaForma.controls['cijena'].disable();

  }

  dodajStavkuNaRacun(){

  }

  updateCijena(osobina:string){
    let cijena = 0;
    if(osobina=='kolicina'){
      cijena=this.stavkaForma.controls['cijena'].value;
      cijena=cijena + this.stavkaForma.controls['kolicina'].value*0.5;

    }
    if(osobina=='porcija'){
      let index = this.porcije.indexOf(this.stavkaForma.controls['porcija'].value);
      cijena=this.stavkaForma.controls['cijena'].value;
      cijena+=(index+1)*1;
    }
    this.stavkaForma.controls['cijena'].setValue('')
    this.stavkaForma.controls['cijena'].setValue(cijena)
  }

}
