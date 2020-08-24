import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import "ag-grid-enterprise"

import { AppComponent } from './app.component';
// import { ContactCreateComponent } from './contacts/contact-create/contact-create.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { AgGridModule } from 'ag-grid-angular';
import { ContactsService } from './contacts/contacts.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    // ContactCreateComponent,
    ContactListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NoopAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    AgGridModule.withComponents(),
    HttpClientModule
  ],
  providers: [ContactsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
