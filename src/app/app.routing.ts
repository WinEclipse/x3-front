//要使用angular的路由功能需要先引入Routes,RouterModule
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent }      from './components/student/student.component';
import { LoginComponent }      from './components/login/login.component';

//路由配置
const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  // {
  //   path: 'user',
  //   component: UserComponent
  // },
  {
    path: 'student',
    component: StudentComponent
  }
  ,
  {
    path: 'login',
    component: LoginComponent
  }
//   {
//     path: 'users',
//     component: UsersComponent
//   }
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });
