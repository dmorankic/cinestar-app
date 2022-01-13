import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { BuyService } from '../Services/buy.service';

@Component({
  selector: 'app-buy-tickets',
  templateUrl: './buy-tickets.component.html',
  styleUrls: ['./buy-tickets.component.scss']
})
export class BuyTicketsComponent implements OnInit,AfterViewInit {

  @ViewChildren('seats')
  _seats:QueryList<ElementRef>;
  alphabet:string[] = [];

  seats:any[]=[];
  rows:any[]=[];
  tickets:any[]=[];
  receats:any[]=[];
  film:any={};

  constructor(private buyService:BuyService) {

    //dummy data
    this.film.slikaUrl='https://m.media-amazon.com/images/M/MV5BZTJmYTJmYTktMzU1Yy00ZTZlLTgzNjItYmY4ZDFjZGFjYjZhXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_Ratio0.7273_AL_.jpg'
    this.film.cijena = 5;
    this.film.naziv = 'top movie';
    //

    for(let i=0; i < 45;i++){
      this.seats.push(i)
    }

    this.alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

    let alfaLength = this.alphabet.length;

    for (let i = this.alphabet.length; i < this.seats.length; i++) {
      let point = i%this.alphabet.length;
      let point2 = this.alphabet.length-alfaLength;
      this.alphabet.push(this.alphabet[point2]+this.alphabet[point]);
    }

    let size = Math.ceil(this.seats.length/4);

    let row = [];
    for(let i=0;i<this.seats.length;i++){
      row.push(this.seats[i]);
      if(row.length==8){
        this.rows.push(row);
        row=[];
      }
    }


  }
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.loadReceipt()
  }

  showModal(){
    var modal = document.getElementById("myModal");
    (modal as HTMLElement).style.display = "block";
    let interval = setInterval(
        (x:any)=>{
          this.loadReceipt()
          if((JSON.stringify(this.buyService.getSnacksRacuni()) === JSON.stringify(this.receats)) && this.buyService.getSnacksRacuni()!=[])
            clearInterval(interval);
        },
        100
    )



  }

  ukloniRacun(racun:any){
    console.log("this happened",racun);
    if(racun.stavkaPonudeId)
      this.buyService.ukloniSnackRacun(racun)
    else{

      this.buyService.ukloniMovieRacun(racun)
    }

    this.deselectSeat(racun.id)
  }

  selectSeat(index:number,row:number){
    let seat = document.getElementById(this.alphabet[index]);
    let receat = {id:index, cijena:this.film.cijena, naziv:'obicna karta',red:row+1,kolona:index+1}
    if(seat){
      if(seat.classList.contains('bg-dark')){
        seat.classList.add('bg-secondary');
        seat.classList.remove('bg-dark');
        this.buyService.dodajMovieRacun(receat)
      }
      else{
        seat.classList.add('bg-dark');
        seat.classList.remove('bg-secondary');
        this.buyService.ukloniMovieRacun(receat)
      }
    }
    this.loadReceipt()
  }

  deselectSeat(index:number){
    let seat = document.getElementById(this.alphabet[index]);
    if(seat){
      seat.classList.add('bg-dark');
      seat.classList.remove('bg-secondary');
      this.loadReceipt()
      return;
    }
    console.log("seat was null??");

  }


  loadReceipt(){
    this.tickets=[]
    this.tickets=this.buyService.getMovieRacuni();
    this.buyService.getSnacksRacuni().forEach(elem=>{
      if(!this.tickets.includes(elem))
        this.tickets.push(elem);
      if(!this.receats.includes(elem))
        this.receats.push(elem);
    })
  }
}
