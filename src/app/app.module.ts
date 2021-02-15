import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CountdownModule } from 'ngx-countdown';

import {OverlayModule} from '@angular/cdk/overlay';
import {PortalModule} from '@angular/cdk/portal';


import { MainGameComponent } from './main-game/main-game.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { ConsentFormComponent } from './consent-form/consent-form.component';
import { FirstFormComponent } from './first-form/first-form.component';
import { DialogComponent } from './main-game/dialog/dialog.component';
import { WalkthroughModule } from 'ngx-walkthrough';
import { CarouselComponent } from './main-game/dialog/carousel/carousel.component';
import { CarouselItemDirective } from '../app/main-game/dialog/carousel/carousel-item.directive';
import { CarouselItemElementDirective } from '../app/main-game/dialog/carousel/carousel-item-element.directive';
import { MyOverlayComponent } from './main-game/my-overlay/my-overlay.component';

@NgModule({
  declarations: [
    AppComponent,
    MainGameComponent,
    HeaderComponent,
    LoginComponent,
    ConsentFormComponent,
    FirstFormComponent,
    DialogComponent,
    CarouselComponent,
    CarouselItemDirective, 
    CarouselItemElementDirective, MyOverlayComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatRadioModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatSelectModule,
    MatTabsModule,
    MatMenuModule,
    MatTooltipModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CountdownModule,
    WalkthroughModule,
    OverlayModule,
    PortalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }