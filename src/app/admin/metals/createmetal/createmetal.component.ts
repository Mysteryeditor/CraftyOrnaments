import { FocusMonitor } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'jquery';
import { MetalsService } from 'src/services/metals.service';

@Component({
  selector: 'app-createmetal',
  templateUrl: './createmetal.component.html',
  styleUrls: ['./createmetal.component.css'],
})
export class CreatemetalComponent implements OnInit {
  hideImg: boolean=false;
  src: string='';
  constructor(private metalService:MetalsService,private router:Router) {}
  metalForm!: FormGroup;
  metalName!: FormControl;
  purityGrade!: FormControl;
  metalImage!: FormControl;
  marketPrice!: FormControl;
  response={
    dbPath: ''
  }

  ngOnInit(): void {
    this.metalName = new FormControl('', [Validators.required]);
    this.marketPrice = new FormControl('',[Validators.required]);
    this.purityGrade = new FormControl('',[Validators.required]);
    this.metalImage = new FormControl('',[Validators.required]);

    this.metalForm = new FormGroup({
      metalName: this.metalName,
      purityGrade: this.purityGrade,
      metalImage: this.metalImage,
      marketPrice: this.marketPrice
    });
  }

  public uploadFinished=(event:any)=>{
    this.response = event;
    this.metalImage.setValue(this.response.dbPath);
    console.log(this.response.dbPath)
    this.hideImg = true;
    this.src= `https://localhost:44380/${this.response.dbPath}`
  }

  metalCreate(){
    console.log(this.metalForm.value);
    this.metalService.postMetalData(this.metalForm.value).subscribe({
      next:(response)=>{
        console.log(response);
        if(response.statusCode==200){
          this.router.navigateByUrl('/ViewOrders');
        }
      },
      error:(err)=> {
        console.log(error);
      },
    });
  
  
  }
}
