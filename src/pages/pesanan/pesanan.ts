import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { global } from '../home/global';
import { UpuserPage } from '../upuser/upuser';
import { Storage } from '@ionic/storage';
// import { SummaryResolver } from '@angular/compiler';
import { Http, Headers, RequestOptions } from '@angular/http';


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
  alert: any;
  access: boolean = false;

  public params: String;
  public nama_barang: String;


  db = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public storage: Storage,
    public http: Http
  ) {
    this.todo['idUser'] = navParams.get("user_id");

    this.indexData();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PesananPage');
  }

  deleteMessage() {
    this.storage.remove('dataBelanja');
    this.navCtrl.setRoot(HomePage);
    
  }

  bayMessage() {
    // console.log(this.todo);
    this.storage.get('dataBelanja').then(data => {
      let e = Object.keys(data);
      for (let i = 0; i < e.length; i++) {
        this.db[i] = { 'idBarang': data[i].idBarang, 'jumlah': data[i].jumlah, 'subTotal': data[i].total };
      }

      // console.log(data);
      this.todo['buys'] = this.db;
      this.todo['superTotal'] = parseInt(this.todo['total']) + parseInt(this.todo['pay']);
      this.todo['superTotal'] = String(this.todo['superTotal']);
      // console.log(this.todo);

      let infoAlert = this.alertCtrl.create({
        title: 'Konfirmasi pesanan',
        subTitle: '<p>Jumlah pasanan : ' + this.todo['total'] + '</p><p> Ongkos Pengiriman : ' + this.todo['pay'] + ' </p><p> Total belanja : ' + this.todo['superTotal'] + ' </p>',
        buttons: [{
          text: "Pesan",
          handler: () => {
            // console.log(this.todo);
            // call database in localhost
            var headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            let option = new RequestOptions({ headers: headers });

            var url = global.url('insertBelanja');


            this.http.post(url, JSON.stringify(this.todo), option)
              .subscribe(data => {
                // console.log(data['_body']);
                this.confirmPemesanan(data['_body']);
              })
          }

        }, {
          text: 'Tutup'
        }]
        // subTitle : ' '
      });

      infoAlert.present();
      // this.to
    });
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
            // this.navCtrl.setRoot(this.navCtrl.getActive().component, {user_id: this.todo['idUser']});
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

    // this.todo['total'] = parseInt(this.todo['pay']) + parseInt(total);
    this.todo['total'] = String(total);

    this.sum = this.todo['total'];

    // this.navCtrl.setRoot(this.navCtrl.getActive().component);
    // console.log(this.todo);

  }

  changeStorageCart(e, change, array) {

    array['jumlah'] = change;
    array['total'] = parseInt(array['hrgbarang']) * parseInt(change);
    array['total'] = String(array['total']);

    this.storage.get('dataBelanja').then(data => {
      data[e] = array;
      // console.log(data);
      // console.log(data[e]);
      this.storage.set('dataBelanja', data);
      // window.location.reload();
      this.indexData();
      // this.refreshPage();
        this.navCtrl.setRoot(this.navCtrl.getActive().component, {user_id: this.todo['idUser']});
      // })

      
    });
  }

  indexData() {
    this.storage.get('dataBelanja').then((data) => {
      this.dataPesanan = data;
      this.kys = Object.keys(data); 
      console.log(data);
      for (let i = 0; i < this.kys.length; i++) {
        this.sum += parseInt(this.dataPesanan[i].total);
      }
    })

    

    this.objPay = Object.keys(this.arr);
    this.array = this.arr;

    console.log(this.todo);
    this.getCheckAddress(this.todo['idUser']);

  }

  refreshPage() {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
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

  confirmPemesanan(msg) {
    let message = this.alertCtrl.create({
      title: 'Pesanan',
      subTitle: msg,
      buttons: [{
        text: 'OK',
        handler: () => {
          //window.location.reload();
          this.storage.remove('dataBelanja');
          this.navCtrl.setRoot(HomePage, {user_id: this.todo['idUser']});

        }
      }]
    });

    message.present();

  }
}
