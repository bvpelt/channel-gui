import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ChannelAppComponent}    from "./channel-app/channel-app.component";
import {ChannelEditorComponent} from "./channel-editor/channel-editor.component";
import {MessageEditorComponent} from "./message-editor/message-editor.component";

const routes: Routes = [
  { path: '',           redirectTo: '/app', pathMatch: 'full' },
  { path: 'app',        component: ChannelAppComponent },
  { path: 'addChannel', component: ChannelEditorComponent },
  { path: 'addMessage', component: MessageEditorComponent }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

