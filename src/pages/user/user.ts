import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';

import { UpuserPage } from '../upuser/upuser';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AlertController } from 'ionic-angular';

import { global } from '../home/global';

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  aksesLogin: boolean = false;
  message: any = null;

  profilePicture: any = "assets/img/no_foto.jpg";
  identitas: any;
  id: any;
  array: any = [];

  constructor(public http: Http, public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public alertCtrl: AlertController) {
    this.storage.get('myStore').then((val) => {

      //array.push(data.result[0].md5);
      //this.storage.get('myStore', array);  

      this.array = val;
      // console.log(this.array);


      var url = global.url('user&id=' + val);
      // console.log(url);
      this.http.get(url)
        .map(res => res.json())
        .subscribe(data => {

          this.identitas = data.result;
          if (this.identitas[0].alamat == "") {
            this.message = "Pilih update, untuk mengisi alamat anda !";
          }
        }) // end http
    }); // end storange
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }

  getPoin() {
    let alert = this.alertCtrl.create({
      title: 'Poin Anda',
      subTitle: 'Silahkan belanja untuk mendapatkan poin kami',
      buttons: ['OK']
    });
    alert.present();

  }

  getSetting() {
    // let alert = this.alertCtrl.create({
    //       title: 'Settings',
    //       subTitle: 'Anda siap untuk seting',
    //       buttons: ['OK']
    //     });
    //     alert.present();
    this.navCtrl.push(UpuserPage);
  }

  getInfo() {
    let alert = this.alertCtrl.create({
      title: 'Tentang Oxy Water!',
      subTitle: 'Oxy water merupakan jasa produksi iar dan mengantarnya sampai ke rumah anda !',
      buttons: ['OK']
    });
    alert.present();

  }

  getLogOut() {

    let confirm = this.alertCtrl.create({
      title: 'Keluar aplikasi?',
      message: 'Anda akan keluar dari aplikasi ini?',
      buttons: [
        {
          text: 'Kembali',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Keluar',
          handler: () => {
            //console.log('Agree clicked');
            this.aksesLogin = true;
            this.storage.clear();
            this.storage.remove(this.array);
            //console.log(im);
            // window.location.reload();

            this.navCtrl.push(LoginPage);
          }
        }
      ]
    });
    confirm.present();
  }

}
