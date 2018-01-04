import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';
import { global } from '../home/global';

import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-upuser',
  templateUrl: 'upuser.html',
})

export class UpuserPage {
  todo = {}
  kecamatan: any;
  kelurahan: any;
  //arrKelurahan = new Array();
  objKeyKelurahan: any;
  objKeyKecamatan: any;

  alamat: any;
  keys: any;
  //idMd5:any;
  keyKecamatan: string;
  keyKelurahan: string;

  array: any = [];
  //alamatKecamatan:string;
  //alamatKelurahan:string;
  //    objArray:TestObject[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, public storage: Storage, public alertCtrl: AlertController) {
    this.setAlamat();
    //this.todo['nama'] = "saya";

    this.storage.get('myStore').then((val) => {

      this.array = val;
      this.setDataUser(this.array);
      //console.log(this.array);


    })  // end storage

  } // end construc


  setAlamat() {

    var url = global.url('alamat');

    //var url = "assets/script/alamat.json";
    this.http.get(url).map(res => res.json()).subscribe(data => {
      this.kecamatan = data.result;
      this.objKeyKecamatan = Object.keys(this.kecamatan);
      //console.log(this.kecamatan);
    }, rej => { console.error("Could not local data", rej) });
  }

  getKecamatan(e, val) {
    this.keys = e;
    this.todo['keyObjKecamatan'] = e;
    this.objKeyKelurahan = Object.keys(this.kecamatan[e].kelurahan);
    this.todo['kecamatan'] = this.kecamatan[e].kecamatan;
    //console.log(this.alamatKecamatan);
  }
  getKelurahan(e, val) {
    this.todo['keyObjKelurahan'] = e;
    this.todo['kelurahan'] = this.kecamatan[this.keys].kelurahan[e].desa;
    //console.log(this.alamatKelurahan);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpuserPage');
  }

  updateDataPelanggan() {
    var headers = new Headers();

    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
    var url = global.url('updatePelanggan');

    this.http.post(url, JSON.stringify(this.todo), options)
      .subscribe(data => {
        //console.log(data['_body']);
        //console.log(data);
        this.showAlertSuccess(data['_body']);
      });
  }

  setDataUser(id) {
    var url = global.url('user&id=' + id);

    this.http.get(url).map(res => res.json()).subscribe(data => {
      this.todo = data.result[0];
      if (this.todo['keyObjKecamatan'] != null) {
        //console.log(this.todo['keyObjKecamatan']);
        this.keyKecamatan = this.todo['keyObjKecamatan'];
        this.getKecamatan(this.todo['keyObjKecamatan'], this.todo['keyObjKecamatan']);
      }


      if (this.todo['keyObjKelurahan'] != null) {
        //console.log(this.todo['keyObjKelurahan']);
        this.keyKelurahan = this.todo['keyObjKelurahan'];
        this.getKelurahan(this.todo['keyObjKelurahan'], this.todo['keyObjKelurahan']);
      }

      //console.log(this.todo);
    })
  } // end funct.. setDataUser()

  showAlertSuccess(info) {
    let alert = this.alertCtrl.create({
      title: 'Info',
      subTitle: info,
      buttons: [{
        text: 'OK',
        handler: () => {
          // window.location.reload();
          this.navCtrl.setRoot(this.navCtrl.getActive().component);
        }
      }]
    });
    alert.present();
  } // end funct..

}
