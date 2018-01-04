import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
import { TransaksiPage } from '../transaksi/transaksi';
import { UserPage } from '../user/user';

import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  
  aksesLogin :boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {

    this.storage.get('myStore').then((data) => {
      if(data == null){
        this.aksesLogin = true;
        this.navCtrl.push(LoginPage);
        //console.log(data);
      }
    });

  }

  homePage = HomePage;

  transaksiPage = TransaksiPage;

  userPage = UserPage;

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
