import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ChannelsComponent } from './channels/channels.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageEditorComponent } from './message-editor/message-editor.component';
import { ChannelEditorComponent } from './channel-editor/channel-editor.component';
import { AppRoutingModule } from './/app-routing.module';
import { ChannelAppComponent } from './channel-app/channel-app.component';
import { LoginComponent } from './login/login.component';
import { AccountEditorComponent } from './account-editor/account-editor.component';


@NgModule({
  declarations: [
    AppComponent,
    ChannelsComponent,
    MessagesComponent,
    MessageEditorComponent,
    ChannelEditorComponent,
    ChannelAppComponent,
    LoginComponent,
    AccountEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
