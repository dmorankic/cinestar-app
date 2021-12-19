import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Grad, Uloga } from 'src/app/User/Model/General';
import { Worker,VrstaRadnika } from 'src/app/User/Model/Worker';
import { WorkerService } from 'src/app/User/Services/worker.service';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.scss']
})
export class WorkerComponent implements OnInit {
  pretragaGrada:any;
  gradovi:any=[];
  Name:string=''

  //za select
  grad:any;
  spol:any;
  uloga:any;


  city:any;
  selectedValue:any;
  contactForm:FormGroup;
  dodajForm:any;
  urediForma:any;
  worker:any;
  count:number=0;
  workers:any;
  workersFiltered:any=[];
  uredi:boolean=false;
  dodaj:boolean=false;
  default:boolean=false;
  none=true;
  passcode:string='password';
  uloge:any=[];
  spolovi:any=[{naziv:"M",value:0},{naziv:"Ž",value:1}]
//*ngIf="!username.valid && username.touched"
  constructor(private workerService:WorkerService,private fb:FormBuilder) {
      this.loadUloge()
      this.loadGradovi()

    this.contactForm=fb.group({
      pretragaGrada:[new FormControl()],
      searchText: [new FormControl('')],

    });


   }

   refresh(){
     this.loadUsers();
   }
  ngOnInit(): void {
    this.loadUsers()
    this.loadUloge()
    this.dodajForm=this.fb.group({
      username: [new FormControl(''),Validators.required],
      strucnaSprema: [new FormControl(''),Validators.required],
      broj_telefona: [new FormControl(''),Validators.required],
      email: [new FormControl(''),Validators.required],
      password: [new FormControl(''),Validators.required],
      ime_prezime: [new FormControl(''),Validators.required],
      uloga: [new FormControl(this.uloge),Validators.required],
      jmbg: [new FormControl(''),Validators.required],
      grad:[new FormControl(this.gradovi),Validators.required],
      spol:[new FormControl(this.spolovi),Validators.required],
      datum_uposlenja:[new FormControl(),Validators.required],
      b_date:[new FormControl(),Validators.required],
      plata:[new FormControl(),Validators.required],
    })

  }

  Search(form: FormGroup){
    this.city="";
       this.Name="";
       this.loadUsers()
    }

    async loadUsers(pretragaGrada:any=null){
    this.workers=null;
    this.workerService.getAll().subscribe(x=>{
      this.workers=x;
      this.count=this.workers.length;
      if(pretragaGrada!=null)
      {
        this.workersFiltered=[]
        this.workers.forEach((item:Worker) => {
          if(item.gradId==pretragaGrada.value){
            item.grad=this.gradovi[pretragaGrada.value-2]
            item.vrstaRadnika=this.uloge.find((x:any)=>x.value==item.vrstaRadnikaId)

            this.workersFiltered.push(item);
          }
        });
        this.workers=[];
        this.workers=((this.workersFiltered as unknown) as Worker[]);
      }
    });
  }

  async loadGradovi(){
    if(this.gradovi.length==0){
      this.workerService.getGradovi().subscribe(x=>{
        const somthing = x;
        for (let i = 0; i < (somthing as Grad[]).length; i++) {
          this.gradovi.push({
            naziv:(somthing as Grad[])[i].naziv,
            value:(somthing as Grad[])[i].id
          });
        }
      })
    }
  }

  async loadUloge(){
    this.workerService.getUloge().subscribe(x=>{
      const somthing = x;
      for (let i = 0; i < (somthing as Uloga[]).length; i++) {
        this.uloge.push({
          naziv:(somthing as Uloga[])[i].naziv,
          value:(somthing as Uloga[])[i].id

       });
      }
    })
  }

  toggle(action:string){
    if(action=='back'){
      this.dodaj=false;
      this.uredi=false;
      this.default=true;
      this.none=false;
    }

    if(action=='uredi'){

      this.loadForm()
      this.dodaj=false;
      this.uredi=true;
      this.default=false;
      this.none=false;
    }

    if(action=='dodaj'){
      this.dodaj=true;
      this.uredi=false;
      this.default=false;
      this.none=false;
      this.dodajForm.reset()
    }

    if(action=='none'){
      this.dodaj=false;
      this.uredi=false;
      this.default=false;
      this.none=true;
    }
  }
  odaberi(id:number){
    this.workerService.getById(id).subscribe(x=>{
      this.worker=x;
      this.none=false;
      this.default=true;
      this.setUloga(null,(x as Worker).vrstaRadnika);
      this.setSpol(null,(x as Worker).spol);
      this.setGrad(null,(x as Worker).grad);
    });
    this.toggle('back')
  }

  update(id:number,form:FormGroup){
    this.setUloga(null,this.worker.uloga);
    this.setSpol(null,this.worker.spol);
    this.setGrad(null,this.worker.grad);
    (this.worker as Worker).username=form.value.username;
    (this.worker as Worker).ime_prezime=form.value.ime_prezime;
    (this.worker as Worker).email=form.value.email;
    (this.worker as Worker).password=form.value.password;
    (this.worker as Worker).broj_telefona=form.value.broj_telefona;
    (this.worker as Worker).strucnaSprema=form.value.strucnaSprema;
    (this.worker as Worker).vrstaRadnikaId = form.value.uloga;
    (this.worker as Worker).spol=form.value.spol;
    (this.worker as Worker).gradId=form.value.grad;
    (this.worker as Worker).datum_uposljenja=form.value.datum_uposlenja;
    (this.worker as Worker).b_date=form.value.b_date;
    (this.worker as Worker).jmbg=form.value.jmbg;
    (this.worker as Worker).plata=form.value.plata;
    this.workerService.update(id,this.worker).subscribe(
      x=>{
        this.toggle('back')
      },err=>console.log(err)
    );
    this.loadUsers()
  }

  remove(id:number){

    this.workerService.delete(id).subscribe();
    this.loadUsers()
  }

  passwordToggle(){
    this.passcode=this.passcode=="password"?'text':'password';
  }

  insert(form:FormGroup){
    var worker = new Object();
    (worker as Worker).username=form.value.username;
    (worker as Worker).ime_prezime=form.value.ime_prezime;
    (worker as Worker).email=form.value.email;
    (worker as Worker).password=form.value.password;
    (worker as Worker).broj_telefona=form.value.broj_telefona;
    (worker as Worker).strucnaSprema=form.value.strucnaSprema;
    (worker as Worker).vrstaRadnikaId = form.value.uloga;
    (worker as Worker).spol=form.value.spol;
    (worker as Worker).gradId=form.value.grad;
    (worker as Worker).datum_uposljenja=form.value.datum_uposlenja;
    (worker as Worker).b_date=form.value.b_date;
    (worker as Worker).jmbg=form.value.jmbg;
    //alert(form.value.strucnaSprema)
    console.log(worker);
    this.workerService.insert(worker as Worker).subscribe(x=>{
      this.loadUsers()
      form.reset()
      this.toggle('default')
    });

  }


  get getDodajForm(){
    return this.dodajForm.controls;
  }

  get getUrediForm(){
    return this.dodajForm.controls;
  }

  setGrad(e:any=null,city:Grad|null=null){
    if(e!=null){
      this.grad=this.gradovi[e.target.value[0]];
      console.log(this.grad);
    }else{
      this.grad=city;
    }
  }

  setSpol(e:any=null,gender:string|null=null){
    if(e!=null){
      this.spol=this.spolovi[e.target.value[0]];
      console.log(this.spol);
    }else{
      this.spol=gender;
    }
  }

  setUloga(e:any=null,rola:VrstaRadnika|null=null){
    if(e!=null){
     this.uloga=this.uloge[e.target.value[0]];
    }else{
      this.uloga=rola;
    }
  }

  SearchPoGradu(e:any){

    if(this.pretragaGrada=="NOT_CHANGED")
    {
      this.pretragaGrada = null;
      return;
    }
    else if(this.pretragaGrada==e.target.value[0]){
      this.loadUsers();
      return;
    }
    else if(this.pretragaGrada!="NOT_CHANGED" || this.pretragaGrada!=this.gradovi[e.target.value[0]]){
      this.pretragaGrada=this.gradovi[e.target.value[0]];
      this.loadUsers(this.pretragaGrada);
      this.pretragaGrada = "NOT_CHANGED";
    }

  }


  loadForm(){
    this.urediForma=this.fb.group({
      username: [new FormControl(''),Validators.required],
      strucnaSprema: [new FormControl(''),Validators.required],
      broj_telefona: [new FormControl(''),Validators.required],
      email: [new FormControl(''),Validators.required],
      password: [new FormControl(''),Validators.required],
      ime_prezime: [new FormControl(''),Validators.required],
      uloga: ['',Validators.required],
      jmbg: [new FormControl(''),Validators.required],
      grad:['',Validators.required],
      spol:['',Validators.required],
      datum_uposlenja:[new FormControl(),Validators.required],
      b_date:[new FormControl(),Validators.required],
      plata:[new FormControl(),Validators.required],
    })

    this.urediForma.controls.username.setValue(this.worker.username);
    this.urediForma.controls.ime_prezime.setValue(this.worker.ime_prezime);
    this.urediForma.controls.email.setValue(this.worker.email);
    this.urediForma.controls.broj_telefona.setValue(this.worker.broj_telefona);
    this.urediForma.controls.strucnaSprema.setValue(this.worker.strucnaSprema);
    this.urediForma.controls.spol.setValue(this.worker.spol);
    this.urediForma.controls.datum_uposlenja.setValue(this.worker.datum_uposlenja);
    this.urediForma.controls.b_date.setValue(this.worker.b_date);
    this.urediForma.controls.plata.setValue(this.worker.plata);
    this.urediForma.controls.jmbg.setValue(this.worker.jmbg);
    this.urediForma.controls.uloga.setValue(this.worker.vrstaRadnikaId);
    this.urediForma.controls.grad.setValue(this.worker.gradId);
    this.urediForma.controls.password.setValue(this.worker.password);
  }
}
