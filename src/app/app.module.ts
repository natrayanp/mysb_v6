import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
// import { HttpModule }    from '@angular/http';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

// import { NotifymoduleModule } from './commonmodule/notifymodule/notifymodule.module';
import { environment } from '../environments/environment';

import { MatSidenavModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material';
import { MatSortModule } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MatSlideToggleModule } from '@angular/material';
import { MatStepperModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material';
import { MatRadioModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { MatChipsModule } from '@angular/material';
import { MatIconModule, MatIconRegistry } from '@angular/material';
import { MatTabsModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material';
import { MatDatepickerModule,MatNativeDateModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material';
import { MatTableModule } from '@angular/material';
import { MatButtonToggleModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatTreeModule } from '@angular/material/tree';
import { MatGridListModule } from '@angular/material/grid-list';

import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, PreloadAllModules } from '@angular/router';

import { ROUTES } from './app.routes';
import { ToolbarComponent } from './home/toolbar/toolbar.component';
import { LoginComponent } from './home/login/login.component';
// import { Dialog1 } from './home/login/login.component';
import { UserstateService } from './natservices/userstate.service';
import { LogincheckComponent } from './logincheck/logincheck.component';
import { PostloginComponent } from './postlogin/postlogin.component';
import { PostlogintoolbarComponent } from './postlogin/postlogintoolbar/postlogintoolbar.component';
import { DashboardComponent } from './postlogin/dashboard/dashboard.component';
// import { OrdersComponent } from './postlogin/orders/orders.component';
// import { PfqtypopupComponent } from './postlogin/orders/pfqtypopup/pfqtypopup.component';
import { SettingsComponent } from './postlogin/settings/settings.component';
import { UserssetupComponent } from './postlogin/settings/userssetup/userssetup.component';
import { UserListComponent } from './postlogin/settings/userssetup/user-list/user-list.component';
import { UserCardComponent } from './postlogin/settings/userssetup/user-card/user-card.component';
// import { PortfoliosetupComponent } from './postlogin/settings/portfoliosetup/portfoliosetup.component';
import { PortfolioCardComponent } from './postlogin/settings/portfoliosetup/portfolio-card/portfolio-card.component';
import { PortfolioListComponent } from './postlogin/settings/portfoliosetup/portfolio-list/portfolio-list.component';
import { GooglePieChartService } from './googlechartservice/google-pie-chart.service';
import { GooglelineChartService } from './googlechartservice/linechart/google-line-charts.service';
import { ChartComponent } from './chart/chart.component';
import { PfserviceService } from './natservices/pfservice.service';
import { SettingspfService } from './natservices/settingspf.service';
import { NatInterceptor } from './natservices/natinterceptor';
import { FundallocatComponent } from './postlogin/fundallocat/fundallocat.component';
import { OrderservService } from './natservices/orderserv.service';
import { DbservicesService } from './natservices/dbservices.service';
import { StkwiseorderComponent } from './postlogin/order/stkwiseorder/stkwiseorder.component';
import { mffundlistComponent } from './postlogin/order/mforder/mffundlist/mffundlist.component';




import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { SignupComponent } from './home/signup/signup.component';
import { AuthService } from './natservices/auth.service';
import { NotifyService } from './natservices/notify.service';
import { BsestarmfregistrationComponent } from './postlogin/settings/bsestarmfregistration/bsestarmfregistration.component';
import { BannerComponent } from './commonmodule/notificationmodule/banner/banner.component';
import { AlertsComponent } from './commonmodule/notificationmodule/alerts/alerts.component';
import { NotificationComponent } from './commonmodule/notificationmodule/notification/notification.component';
import { NotificationMessageComponent } from './commonmodule/notificationmodule/notification-message/notification-message.component';
// import { FileuploadComponent } from './fileupload/fileupload.component';
import { FileuploadService } from './natservices/fileupload.service';
import { ForgotpassComponent } from './home/forgotpass/forgotpass.component';
import { BseregsuccComponent } from './postlogin/settings/bseregsucc/bseregsucc.component';
import { BsereguploadComponent } from './postlogin/settings/bseregupload/bseregupload.component';
import { NoticommComponent } from './commonmodule/notificationmodule/noticomm/noticomm.component';
import { MforderconfpgComponent } from './postlogin/order/mforder/mforderconfpg/mforderconfpg.component';
import { MandateregComponent } from './postlogin/settings/mandate/mandatereg/mandatereg.component';
import { MandateComponent } from './postlogin/settings/mandate/mandate.component';
import { MandateinqComponent } from './postlogin/settings/mandate/mandateinq/mandateinq.component';
import { MfpaynaviComponent } from './postlogin/order/mforder/mfpaynavi/mfpaynavi.component';
import { MfpayconflandComponent } from './postlogin/order/mforder/mfpayconfland/mfpayconfland.component';
import { DashcardComponent } from './postlogin/dashboard/dashcard/dashcard.component';
import { DashlistComponent } from './postlogin/dashboard/dashlist/dashlist.component';
import { HoldetailComponent } from './postlogin/dashboard/holdetail/holdetail.component';
import { DashfundComponent } from './postlogin/dashboard/dashfund/dashfund.component';
import { DashboardService } from './natservices/dashboard.service';
import { ProdcardComponent } from './postlogin/dashboard/prodcard/prodcard.component';
import { ProdlistComponent } from './postlogin/dashboard/prodlist/prodlist.component';
import { OrderhistComponent } from './postlogin/order/orderhist/orderhist.component';
import { OrderhistlistComponent } from './postlogin/order/orderhist/orderhistlist/orderhistlist.component';
import { OrderhistcardComponent } from './postlogin/order/orderhist/orderhistcard/orderhistcard.component';
import { OrderComponent } from './postlogin/order/order.component';
import { OrderplaceComponent } from './postlogin/order/orderplace/orderplace.component';
import { DialogsModule } from './commonmodule/dialogs/dialogs.module';
import { OrderplaceTypeComponent } from './postlogin/order/orderplace/orderplace-type/orderplace-type.component';
import { OrdplacePfwiselistComponent } from './postlogin/order/orderplace/ordplace-pfwiselist/ordplace-pfwiselist.component';
import { OrdplacePfwisecardComponent } from './postlogin/order/orderplace/ordplace-pfwisecard/ordplace-pfwisecard.component';
import { MfselllistComponent } from './postlogin/order/mforder/mfselllist/mfselllist.component';
import { OrderplaceConfoptionsComponent } from './postlogin/order/orderplace/orderplace-confoptions/orderplace-confoptions.component';
import { OrderpendingComponent } from './postlogin/order/orderpending/orderpending.component';
import { OrderpendingTypeComponent } from './postlogin/order/orderpending/orderpending-type/orderpending-type.component';
import { OrderpendingCardComponent } from './postlogin/order/orderpending/orderpending-card/orderpending-card.component';
import { OrderpendingListComponent } from './postlogin/order/orderpending/orderpending-list/orderpending-list.component';
import { OrpendingTableComponent } from './postlogin/order/orderpending/orpending-table/orpending-table.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolbarComponent,
    LoginComponent,
//    Dialog1,
    LogincheckComponent,
    PostloginComponent,
    PostlogintoolbarComponent,
    DashboardComponent,
    // OrdersComponent,
    // PfqtypopupComponent,
    SettingsComponent,
    UserssetupComponent,
    UserListComponent,
    UserCardComponent,
    // PortfoliosetupComponent,
    PortfolioCardComponent,
    PortfolioListComponent,
    ChartComponent,
    PfserviceService,
    FundallocatComponent,
    // OrderComponent,
    StkwiseorderComponent,
    mffundlistComponent,
    SignupComponent,
    BsestarmfregistrationComponent,
    BannerComponent,
    AlertsComponent,
    NotificationComponent,
    NotificationMessageComponent,
    ForgotpassComponent,
    BseregsuccComponent,
    BsereguploadComponent,
    NoticommComponent,
    MforderconfpgComponent,
    MandateregComponent,
    MandateComponent,
    MandateinqComponent,
    MfpaynaviComponent,
    MfpayconflandComponent,
    DashcardComponent,
    DashlistComponent,
    HoldetailComponent,
    DashfundComponent,
    ProdcardComponent,
    ProdlistComponent,
    OrderhistComponent,
    OrderhistlistComponent,
    OrderhistcardComponent,
    OrderComponent,
    OrderplaceComponent,
    OrderplaceTypeComponent,
    OrdplacePfwiselistComponent,
    OrdplacePfwisecardComponent,
    MfselllistComponent,
    OrderplaceConfoptionsComponent,
    OrderpendingComponent,
    OrderpendingTypeComponent,
    OrderpendingCardComponent,
    OrderpendingListComponent,
    OrpendingTableComponent
  ],
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      MatSidenavModule,
      MatToolbarModule,
      MatButtonModule,
      MatSortModule,
      MatCardModule,
      FlexLayoutModule,
      MatInputModule,
      MatFormFieldModule,
      MatAutocompleteModule,
      FormsModule,
      ReactiveFormsModule,
      MatSlideToggleModule,
      MatStepperModule,
      MatExpansionModule,
      MatRadioModule,
      MatSelectModule,
      MatChipsModule,
      MatIconModule,
      MatTabsModule,
      MatProgressSpinnerModule,
      MatDialogModule,
      MatSnackBarModule,
      MatDatepickerModule, MatNativeDateModule,
      MatPaginatorModule,
      MatTableModule,
      MatButtonToggleModule,
      MatCheckboxModule,
      MatProgressBarModule,
      MatDividerModule,
      MatTreeModule,
      MatGridListModule,
    RouterModule.forRoot(ROUTES /*,{enableTracing: true }*/),
   // NotifymoduleModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    DialogsModule
  ],
  // entryComponents: [PfqtypopupComponent],
  providers: [GooglePieChartService,
    GooglelineChartService,
              SettingspfService,
              OrderservService,
              DbservicesService,
              {provide: HTTP_INTERCEPTORS, useClass: NatInterceptor, multi: true,},
              {provide: MAT_DATE_LOCALE, useValue: 'en-IN'},
              AuthService, 
              NotifyService,
              FileuploadService,
              UserstateService,
              DashboardService
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
