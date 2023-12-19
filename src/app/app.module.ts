import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import {
  TuiRootModule,
  TuiDialogModule,
  TuiAlertModule,
  TUI_SANITIZER,
} from '@taiga-ui/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { PopupComponent } from './components/popup/popup.component';
import { CompetitionTableComponent } from './components/tables/competition-table/competition-table.component';
import { MembersTableComponent } from './components/tables/members-table/members-table.component';
import { AddHuntingComponent } from './components/add-hunting/add-hunting.component';
import { PodiumComponent } from './components/podium/podium.component';
import { MembersComponent } from './pages/members/members.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Dashboard', component: AdminDashboardComponent },
  { path: 'Members' , component: MembersComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    AdminDashboardComponent,
    HomeComponent,
    HeaderComponent,
    PopupComponent,
    CompetitionTableComponent,
    MembersTableComponent,
    AddHuntingComponent,
    PodiumComponent,
    MembersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
  ],
  exports: [RouterModule],
  providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }],
  bootstrap: [AppComponent],
})
export class AppModule {}
