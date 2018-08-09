import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { RoutingModule } from './routing-module';

import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
import { ErrorComponent } from './components/error/error.component';

import { IssueService} from './services/issue.service';
import { StartComponent } from './components/start/start.component';
import { LearnComponent } from './components/learn/learn.component';
import { HeaderComponent } from './components/template/header/header.component';
import { FooterComponent } from './components/template/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CreateComponent,
    EditComponent,
    ErrorComponent,
    StartComponent,
    LearnComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    IssueService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
