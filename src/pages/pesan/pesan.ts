import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { UpuserPage } from '../upuser/upuser';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { FormBuilder, FormGroup } from "@angular/forms";

import { AlertController } from 'ionic-angular';
import { global } from '../home/global';
// import { Md5 } from '../login/md5';
import { Storage } from '@ionic/storage';
// import { FormGroup } from '@angular/forms/src/model';

@IonicPage()
@Component({
  selector: 'page-pesan',
  templateUrl: 'pesan.html',
})
export class PesanPage {
  idBarang: any;
  idKategori: any;
  subkategori: any;
  arrBarang: any;

  todo = {}

  objPay: any;
  methPay = Array(['COD', 2000, 1], ['free', 0, 2]);
  arr = ({
    0: ({ 'method': 'Kirim ke lokasi', 'pay': '2000' }),
    1: ({ 'method': 'Ambil di toko', 'pay': 0 })
  })
  array: any;
  alert: any;

  access: boolean = false;

  public formPesan: FormGroup;

  constructor(
    public storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder) {
    this.todo['idKategori'] = navParams.get("kategori_id");
    // this.todo['idBarang'] = navParams.get("barang_id");

    // console.log(this.todo);

    this.todo['idUser'] = navParams.get("user_id");

    this.getCheckAddress(this.todo['idUser']);

    this.getShowBarang(this.todo['idKategori']);

    // this.getShowBarang(this.todo['idBarang']);
    // deskripsi option Metode Pembayaran
    this.objPay = Object.keys(this.arr);
    this.array = this.arr;

  }

  getCheckAddress(id) {
    var url = global.url('cekAlamatPelanggan&id=' + id);

    this.http.get(url)
      .map(res => res.json())
      .subscribe(data => {
        if (data.result[0].alamat == '') {
          this.alert = "Alamat anda belum lengkap !!";
          this.access = false;
        } // end if
        else {
          this.access = true;
        }
        // console.log(data.result);
      })

  }

  getSettingsAddress() {
    this.navCtrl.push(UpuserPage);
  }

  setMethodSend(e) {
    this.todo['method'] = this.arr[e].method;
    this.todo['pay'] = this.arr[e].pay;
    // console.log(e);
  }

  insertDataPesanan(v) {
    // console.log(this.todo['idUser']);
    this.todo['id'] = v;
    this.todo['total'] = parseInt(this.todo['pay']) + (parseInt(this.todo['hrgbarang']) * parseInt(this.todo['jumlah'])); // ;
    this.todo['total'] = String(this.todo['total']);

    //this.todo['idUser'] = this.todo['idUser'];




    let alert = this.alertCtrl.create({
      title: 'Konfirmasi Pesanan',
      subTitle: '<p>Pesan : ' + this.todo['nama_barang'] + '</p><p> Jenis Pengiriman : ' + this.todo['method'] + ' </p><p> Total belanja : ' + this.todo['total'] + ' </p>',
      buttons: [{
        text: 'Batal',
        handler: () => {
          // console.log("Pesanan di batalkan");
        }
      }, {
        text: 'Pesan',
        handler: () => {
          // console.log(this.todo);
          // call database in localhost
          var headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
          let option = new RequestOptions({ headers: headers });

          var url = global.url('insertPesanan');


          this.http.post(url, JSON.stringify(this.todo), option)
            .subscribe(data => {
              // console.log(data['_body']);
              this.confirmPemesanan(data['_body']);
            })
        }
      }]
    });
    alert.present();
  }

  addDataPesanan(e) {

    this.todo['total'] = parseInt(this.todo['pay']) + (parseInt(this.todo['hrgbarang']) * parseInt(this.todo['jumlah']));
    this.todo['total'] = String(this.todo['total']);

    console.log(this.todo);
    // this.storage.set('myMessage', this.arr);
    // this.storage.get('myMessage').then((val) => {
    //   console.log(val);
    // });

    // this.storage.remove('myMessage');

  }

  getShowBarang(id) {
    var url = global.url('barang&id=' + id);
    // console.log(url);
    this.http.get(url)
      .map(res => res.json())
      .subscribe(data => {
        this.arrBarang = data.result;
        this.todo['nama_barang'] = data.result[0].nama_barang;
        this.todo['hrgbarang'] = data.result[0].harga;
        this.todo['idBarang'] = data.result[0].id;
        // console.log(this.arrBarang);
      })
  }

  getShowSubkategori(id) {
    var url = global.url('subkategori&id=' + id);

    this.http.get(url)
      .map(res => res.json())
      .subscribe(data => {
        // console.log(data.result);
        this.subkategori = data.result;
      })
  }

  confirmPemesanan(msg) {
    let message = this.alertCtrl.create({
      title: 'Pesanan',
      subTitle: msg,
      buttons: [{
        text: 'OK',
        handler: () => {
          window.location.reload();
        }
      }]
    });

    message.present();

  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad PesanPage');
  }

}
