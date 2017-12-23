import { Component, TemplateRef, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { StudentService } from "../../services/student.service";
import { Subscription } from "rxjs/Subscription";
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
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
    private studentService: StudentService,
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



  refreshData() {

    this.studentService.getAllStudents()
      .subscribe(resMsg => {
        console.log("get all students", resMsg);
        this.students = resMsg.data;
      
      });
  }


  //Add Student
  onStudentAdd(studentData: any) {

    this.studentService.postStudent(studentData)
      .subscribe(
      (res) => {
        console.log("add student", res);
      },
      (error) => {
        alert('Something went Wrong');
      }
      );
    this.studentData = studentData;
  }


  /**
   * edit
   * @param studentData 
   */
  onStudentEdit(studentData) {
    this.studentData = studentData;
    this.studentData.id = this.id;//from modelEditStudent    
    this.studentService.putStudentById(this.studentData.id, this.studentData)
      .subscribe(
      (res) => console.log(res),
      (error) => console.log(error)
      );
    this.refreshData();      
  }



  /**
   * delete
   * @param id 
   */
  onStudentDeleteById(id: string) {
    this.studentService.deleteStudentById(id)
      .subscribe(
      (res) => console.log("delete student", res),
      (error) => alert(error)
      );
  }


  /**
   * add
   * @param template 
   */
  public addStudentModel(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  /**
   * edit
   * @param template 
   * @param studentData 
   */
  editStudentModel(template: TemplateRef<any>, studentData: any) {
    this.id = studentData.id;
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
