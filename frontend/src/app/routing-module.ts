import { NgModule, Component } from '@angular/core'
import { RouterModule, Routes, Router } from '@angular/router';

import { ListComponent } from './components/list/list.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
import { ErrorComponent } from './components/error/error.component';
import { StartComponent } from './components/start/start.component';
import { LearnComponent } from './components/learn/learn.component';

const appRoutes: Routes = [
    { path: '', component: StartComponent },
    { path: 'learn', component: LearnComponent },
    { path: 'list', component: ListComponent },
    { path: 'create', component: CreateComponent },
    { path: 'edit/:id', component: EditComponent },
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: '**', component: ErrorComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class RoutingModule {};