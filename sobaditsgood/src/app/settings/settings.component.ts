import { Component } from '@angular/core';
import * as md5 from 'md5';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  userFirstName: String="Michaeel";
  userLastName:String="Jackson";
  userEmail:string = "mj@gmail.com";
  password:string="Password@9";
  Address:string = "110 12Ave Surrey, BC"
  readonlyFirstName:boolean = true
  readOnlyLastName:boolean=true
  readOnlyAddress:boolean=true
  readOnlyPswd:boolean=true
  isClass:boolean=true
  checkValue:boolean=true

  getPswd():String {
    return md5(this.password);
  }
  fnameEdit(){
    this.readonlyFirstName=!this.readonlyFirstName
   if(this.checkValue==true)
   this.checkValue=!this.checkValue
  }
  lnameEdit(){
    this.readOnlyLastName=!this.readOnlyLastName
    if(this.checkValue==true)
   this.checkValue=!this.checkValue
  }
  addressEdit(){
    this.readOnlyAddress=!this.readOnlyAddress
    if(this.checkValue==true)
   this.checkValue=!this.checkValue
  }
  changePswd(){

  }

}
