import { OriginConnectionPosition } from '@angular/cdk/overlay';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { event } from 'jquery';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-imageupload',
  templateUrl: './imageupload.component.html',
  styleUrls: ['./imageupload.component.css']
})
export class ImageuploadComponent implements OnInit{

  public message!:string;
  public progress!:number;
  @Output() public onUploadFinished=new EventEmitter();
  constructor(private http:HttpClient) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  uploadApi=environment.fileApi;

uploadFile(files:any){
  if(files.length===0) return;
  let fileToUpload=<File>files[0];
  const formData=new FormData();
  formData.append('file',fileToUpload,fileToUpload.name);
  this.http.post(this.uploadApi,formData,{observe:'events'}).subscribe(
    {
      next:(event)=>{
       
        if(event.type===HttpEventType.Response){
          this.message='Upload Success';
          this.onUploadFinished.emit(event.body);
        }
      }
    }
  )
}
}
