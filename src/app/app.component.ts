import { Component } from '@angular/core';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

@Component({
  //组件的挂载点
  selector: 'app-root',
  //组件对应的模板文件路径
  templateUrl: './app.component.html',
  //组件对应的样式文件路径
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private localSt: LocalStorageService) { }

  setStorage(key: string, value: any) {
    this.localSt.store(key, value);
  }

  getStorage(key: string) {
    return this.localSt.retrieve(key);
  }
}