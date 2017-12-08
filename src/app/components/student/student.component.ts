import { Component, TemplateRef, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { DataService } from "../../services/data.service";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  public modalRef: BsModalRef;
  public subscriptions: Subscription[] = [];
  public messages: string[] = [];

  //Student表单
  fStudentData: FormGroup;

  //Student 列表
  students: any;

  //Add Student
  studentData: any;

  //Edit Student
  id: number;
  name: string;
  email: string;
  age: number;



  constructor(
    private modalService: BsModalService,
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.refreshData();

    //TODO: Add Student Form
    this.fStudentData = this.formBuilder.group({

      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', Validators.required]

    });
  }


  //TODO: Refresh Get All Student
  refreshData() {

    //TODO: Get All Student
    this.dataService.getAllStudents()
      .subscribe(data => {
        this.students = data;
        console.log(data);
      });
  }


  //Add Student
  onStudentAdd(studentData: any) {

    this.dataService.postStudent(studentData)
      .subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        alert('Something went Wrong');
      }
      );
    this.studentData = studentData;
    console.log(this.studentData);
  }


  //Edit Student
  onStudentEdit(studentData) {
    this.studentData = studentData;
    this.studentData.id = this.id;//from modelEditStudent    
    this.dataService.putStudentById(this.studentData.id, this.studentData)
      .subscribe(
      (res) => console.log(res),
      (error) => console.log(error)
      );
    this.refreshData();      
  }



  //Delete Student
  onStudentDeleteById(id: number) {
    this.dataService.deleteStudentById(id)
      .subscribe(
      (res) => console.log(res),
      (error) => alert(error)
      );
  }


  //Models------>

  //Add Student Model Open
  public addStudentModel(template: TemplateRef<any>) {
    // console.log("add student template: " + JSON.stringify(template));
    this.modalRef = this.modalService.show(template);
  }

  //Edit Student Model Open
  editStudentModel(template: TemplateRef<any>, studentData: any) {
    // this.modalRef = this.modalService.show(template);
    this.id = studentData.id;
    // console.log(this.id);
    this.name = studentData.name;
    this.email = studentData.email;
    this.age = studentData.age;
    console.log(studentData);


    //Model Methods to refresh List---------->
    this.messages = [];
    this.subscriptions.push(this.modalService.onShow.subscribe((reason: string) => {
      this.messages.push(`onShow event has been fired`);
      console.log(this.messages);
    }));
    this.subscriptions.push(this.modalService.onShown.subscribe((reason: string) => {
      this.messages.push(`onShown event has been fired`);
      console.log(this.messages);
      
    }));
    this.subscriptions.push(this.modalService.onHide.subscribe((reason: string) => {
      this.messages.push(`onHide event has been fired${reason ? ', dismissed by ' + reason : ''}`);
      console.log(this.messages);
    this.refreshData();      
      
      
    }));
    this.subscriptions.push(this.modalService.onHidden.subscribe((reason: string) => {
      this.messages.push(`onHidden event has been fired${reason ? ', dismissed by ' + reason : ''}`);
      console.log(this.messages);
    this.refreshData();      
      
      
      this.unsubscribe();
    }));
    //Model Methods to refresh List---------->
    
    //NOTE: w/o this model will not shown. Write at the end
    this.modalRef = this.modalService.show(template);
  }
  

  //Model Event handling trial
  public unsubscribe() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }


}


// interface studentDate{
//   name: string,
//   email: string,
//   age: number;
// }