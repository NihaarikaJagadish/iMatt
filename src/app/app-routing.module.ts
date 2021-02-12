import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainGameComponent } from './main-game/main-game.component';
import { LoginComponent } from './login/login.component';
import { ConsentFormComponent } from './consent-form/consent-form.component';
import { FirstFormComponent } from './first-form/first-form.component';
import { ButtonTypesExampleComponent } from './button-types-example/button-types-example.component';
import { MyOverlayComponent } from './button-types-example/my-overlay/my-overlay.component';


const routes: Routes = [
  { path: "", component:  LoginComponent},
  { path: "test", component:  MainGameComponent},
  { path: "consent", component:  ConsentFormComponent},
  { path: "firstForm", component:  FirstFormComponent},
  { path: "game", component:  ButtonTypesExampleComponent},
  { path: "ok", component:  MyOverlayComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
