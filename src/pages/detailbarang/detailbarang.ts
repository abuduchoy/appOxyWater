import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { PesanPage } from '../pesan/pesan';

import { global } from '../home/global';

@IonicPage()
@Component({
  selector: 'page-detailbarang',
  templateUrl: 'detailbarang.html',
})
export class DetailbarangPage {
  todo = {}
  keys = {}

  objectKey:any;
  barang:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.keys['barang_id'] = this.navParams.get('barang_id');
    this.keys['user_id'] = this.navParams.get('user_id');

    this.showDetailBarang(this.keys['barang_id']);

    console.log(this.keys);
  }

  showDetailBarang(e) {

    var url = global.url('detailbarang&id=' + e);

    this.http.get(url)
      .map( res => res.json())
      .subscribe( data => {
        this.todo = data.result;
        this.barang = data.result;
        this.objectKey = Object.keys(this.todo);
        console.log(this.objectKey);
        console.log(this.todo);
      });

  }

  getPesanan(){
    this.navCtrl.push(PesanPage, {barang_id: this.keys['barang_id'], user_id: this.keys['user_id']});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailbarangPage');
  }

}
