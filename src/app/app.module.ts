import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModalModule, BsModalService, ModalBackdropComponent } from 'ngx-bootstrap/modal';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { PositioningService } from 'ngx-bootstrap/positioning';

import { AppComponent } from './app.component';
import { routing }       from './app.routing';
import { PaginationComponent } from './components/pagination/pagination.component';
import { StudentComponent } from './components/student/student.component';
import { LoginComponent } from './components/login/login.component';
import { LoginService } from './services/login.service';
import { StudentService } from "./services/student.service";
import { DataInterceptor } from "./services/data-interceptor";
import {Ng2Webstorage} from 'ngx-webstorage';

//@NgModule注解。是一个模块的装饰器，用来给给模块声明一些内容
@NgModule({
  //declarations(声明).用来声明该模块所依赖的组件等内容
  declarations: [
    AppComponent,
    PaginationComponent,
    LoginComponent,
    StudentComponent
  ],

  //该模块所依赖的其他模块
  imports: [
    BrowserModule,
    Ng2Webstorage,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ModalModule.forRoot(),
    routing
    
  ],

  //该模块的依赖注入项(设置依赖的服务)
  providers: [
    StudentService,
    LoginService,
    // BsModalService,
    // ComponentLoaderFactory,
    // PositioningService,
    // ModalBackdropComponent,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DataInterceptor,
      multi: true,
    }],
  //默认启动的组件
  bootstrap: [AppComponent]
})
export class AppModule { }
