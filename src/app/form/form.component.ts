import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { FormsService } from '../forms.service'
//import { Z_ASCII } from 'zlib';
import {User} from '../user'
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  userList :User[]=[];
  thisuser :User;
  defaultuser :User;
  form:FormGroup;
  default:number=0;
  alert:boolean=false;
  constructor(private formservice : FormsService) {
  }
  addform(){
    this.formservice.addform(this.form.value).subscribe(user => {this.userList.push(
      {name:user.name,email:user.email,feedback:user.feedback,comment:user.comment})
      ,this.thisuser={name:user.name,email:user.email,feedback:user.feedback,comment:user.comment}
    }
      ,err =>{this.alert=false,this.default=1,this.thisuser=this.defaultuser}
      ,()=>{this.alert=true,this.default=1;}
      );
  }

  ngOnInit(): void {
    
    this.form=new FormGroup({
      name : new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z]*")]),
      email: new FormControl('',[Validators.required,Validators.email]),
      feedback:new FormControl('',[Validators.required]),
      comment:new FormControl('')
    })
    this.formservice.getdefaultform().subscribe(user => {this.form.setValue(user)
    ,this.thisuser=user,this.defaultuser=user
    }
    ,err =>{}
    );

    //this.formservice.getforms().subscribe(list => this.userList=list);
  }

}
