import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'dashboard', loadChildren: '../components/dashboard/dashboard.module#DashboardModule' },
            { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            { path: 'forms', loadChildren: './form/form.module#FormModule' },
            { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' },
            { path:'userlist',loadChildren:'../components/user/user.module#UserModule'},
            {path:'adduser',loadChildren:'../components/user/adduser.module#AdduserModule'},
            {path:'usermanager',loadChildren:'../components/usermanager/usermanager.module#UserManagerModule'},
            {path:'userview',loadChildren:'../components/user/userview.module#UserViewModule'},
            {path:'employeelist',loadChildren:'../components/employee/employee.module#EmployeeModule'},
            {path:'notificationdetail',loadChildren:'../components/employee/Notificationdetail/notificationdetail.module#NotificationdetailModule'},
            {path:'myapproval',loadChildren:'../components/approval/approval.module#ApprovalModule'}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
