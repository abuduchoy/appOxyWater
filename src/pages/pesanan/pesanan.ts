import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { SummaryResolver } from '@angular/compiler';


@IonicPage()
@Component({
  selector: 'page-pesanan',
  templateUrl: 'pesanan.html',
})
export class PesananPage {
  todo: any = {};
  objPay: any;

  array: any;
  arr = ({
    0: ({ 'method': 'Kirim ke lokasi', 'pay': '2000' }),
    1: ({ 'method': 'Ambil di toko', 'pay': 0 })
  })
  dataPesanan: any;
  kys: any;
  sum: any = 0;

  public params: String;
  public nama_barang: String;

  
  db: {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public storage: Storage
  ) {
    this.indexData();
    this.todo['idUser'] = navParams.get("user_id");

    console.log(this.todo);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PesananPage');
  }

  deleteMessage() {
    this.storage.remove('dataBelanja');
    this.navCtrl.push(HomePage);
  }

  bayMessage() {

  }

  itemSelected(e) {
    this.storage.get('dataBelanja').then(data => {
      let info = this.alertCtrl.create({
        title: 'Ubah Jumlah Pesanan',
        inputs: [{
          name: 'jumlah',
          type: 'number',
          placeholder: 'Jumlah',
          min: 1,
          max: 20,
          value: data[e].jumlah
        }],
        buttons: [{
          text: 'Simpan',
          handler: value => {
            this.changeStorageCart(e, value.jumlah, data[e]);
          }
        }, {
          text: 'Batal',
          handler: () => {
            console.log('Batal');
          }
        }]

      });
      info.present();

      // console.log(data[e]);
    });

  }

  setMethodSend(e: any, total: any) {

    this.todo['method'] = this.arr[e].method;
    this.todo['pay'] = this.arr[e].pay;
    
    console.log(this.todo);
    
  }

  changeStorageCart(e, change, array) {

    array['jumlah'] = change;
    array['total'] = parseInt(array['hrgbarang']) * parseInt(change);
    array['total'] = String(array['total']);

    this.storage.get('dataBelanja').then(data => {
      data[e] = array;
      // console.log(data[e]);
      this.storage.set('dataBelanja', data);
      // window.location.reload();
      this.indexData();
      // this.refreshPage();
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
    });
  }

  indexData() {
    this.storage.get('dataBelanja').then((data) => {
      this.dataPesanan = data;
      this.kys = Object.keys(data); // console.log(data);
      for (let i = 0; i < this.kys.length; i++) {
        this.sum += parseInt(this.dataPesanan[i].total);
      }
    })

    this.objPay = Object.keys(this.arr);
    this.array = this.arr;

  }

  refreshPage() {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }
}
