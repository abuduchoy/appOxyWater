import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { HttpModule } from '@angular/http';

import { TabsPage } from '../pages/tabs/tabs';
import { TransaksiPage } from '../pages/transaksi/transaksi';
import { UserPage } from '../pages/user/user';
import { PesanPage } from '../pages/pesan/pesan';
import { PesananPage } from '../pages/pesanan/pesanan';
import { UpuserPage } from '../pages/upuser/upuser';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
// import { DetailbarangPage } from '../pages/detailbarang/detailbarang';

import { IonicStorageModule } from '@ionic/storage';

//import alamat from '../assets/json/alamat.json';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    TransaksiPage,
    UserPage,
    LoginPage,
    SignupPage,
    UpuserPage,
    PesanPage,
    PesananPage
    // DetailbarangPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {tabsHideOnSubPages: true}),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    TransaksiPage,
    UserPage,
    LoginPage,
    SignupPage,
    UpuserPage,
    PesanPage,
    PesananPage
    // DetailbarangPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
  //accessLogin:boolean = false;
}
