import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelAppComponent } from "./channel-app/channel-app.component";
import { ChannelEditorComponent } from "./channel-editor/channel-editor.component";
import { MessageEditorComponent } from "./message-editor/message-editor.component";
import { LoginComponent } from "./login/login.component";
import { AccountEditorComponent } from "./account-editor/account-editor.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'app', component: ChannelAppComponent },
  { path: 'addChannel', component: ChannelEditorComponent },
  { path: 'addMessage', component: MessageEditorComponent },
  { path: 'addAccount', component: AccountEditorComponent },
  { path: 'login', component: LoginComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

