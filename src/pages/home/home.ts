// import { AppModule } from '../../app/app.module';

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';
// import { SignupPage } from '../signup/signup';
import { DetailbarangPage } from '../detailbarang/detailbarang';

import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { PesanPage } from '../pesan/pesan';
import { PesananPage } from '../pesanan/pesanan';

import { global } from './global';
import { AlertController } from 'ionic-angular';
// import { NgModel } from '@angular/forms/src/directives/ng_model';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  arrBarang: any;
  btnBarang: any;
  idUser: any;
  src: any = global.images();
  params = {};
  todo = {};
  obj: any;
  db = {};
  sumKeranjang = 0;

  desk;
  nama;
  img;
  hrg;

  constructor(public navCtrl: NavController, public storage: Storage, public http: Http, public alertCtrl: AlertController) {
    //console.log(AppModule.accessLogin);
    // var url = global.url('kategori');
    var url = global.url('barangJoinKategori');

    this.http.get(url)
      .map(res => res.json())
      .subscribe(data => {
        this.todo = data.result;
        this.obj = Object.keys(this.todo);
        console.log(this.todo);
      }) // end http
    
    

    this.storage.get('myStore').then((data) => {
      this.idUser = data;
    });

    this.storage.get('dataBelanja').then((data) => {
      if (data != null) {

        let sum = Object.keys(data);
        this.sumKeranjang = sum.length;
        // console.log(data);
        this.db = data;
      }
    });
  }

  getLogin() {
    // menuju loginPage
    this.navCtrl.push(LoginPage);
  }

  getKategori(id) {
    this.navCtrl.push(PesanPage, { kategori_id: id, user_id: this.idUser });
  }

  getPesan(id) {
    this.navCtrl.push(PesanPage, { barang_id: id, user_id: this.idUser });
  }

  getDetailBarang(e) {
    this.navCtrl.push(DetailbarangPage, { barang_id: e, user_id: this.idUser });
  }

  getConfirmPesanan(id) {
    for (let i = 0; i < this.obj.length; i++) {
      if (this.todo[i].id == id) {
        this.nama = this.todo[i].nama;
        this.desk = this.todo[i].deskripsi;
        this.hrg = this.todo[i].hrg;
        this.img = this.todo[i].img;
      }
    }
    this.getShowBarang(id);
    let msg = this.alertCtrl.create({
      title: "<img class='img' src='" + global.images() + "barang/" + this.img + "' />",
      subTitle: this.nama,
      message: "" + this.hrg + ",- :" + this.desk + "",
      inputs: [{
        name: 'jumlah',
        type: 'number',
        placeholder: 'Jumlah',
        min: 1,
        max: 20
      }],
      buttons: [{
        text: 'Belanja',
        handler: data => {

          // this.storage.remove('dataBelanja');
          // window.location.reload();
          for (let i = 0; i < this.obj.length; i++) {
            if (this.todo[i].id == id) {
              // this.params['idKategori'] = this.todo[i].id;
              this.params['idKategori'] = this.todo[i].id;
              this.params['total'] = parseInt(this.params['hrgbarang']) * parseInt(data.jumlah);
              this.params['total'] = String(this.params['total']);
              this.params['nama_barang'] = this.todo[i].nama;
              this.params['jumlah'] = data.jumlah;
              // this.todo['total'] = data.jumlah;
              if (this.sumKeranjang > 0) {
                this.db[this.sumKeranjang] = this.params;
                this.storage.set('dataBelanja', this.db);
              } else {
                this.db[0] = this.params;
                this.storage.set('dataBelanja', this.db);
              }
              // window.location.reload();
              this.navCtrl.setRoot(this.navCtrl.getActive().component);
            } // end if
          } // end for
        }
      }, {
        text: 'Bayar',
        handler: data => {

          for (let i = 0; i < this.obj.length; i++) {
            if (this.todo[i].id == id) {
              // this.params['idKategori'] = this.todo[i].id;
              this.params['idKategori'] = this.todo[i].id;
              this.params['total'] = parseInt(this.params['hrgbarang']) * parseInt(data.jumlah);
              this.params['total'] = String(this.params['total']);
              this.params['nama_barang'] = this.todo[i].nama;
              this.params['jumlah'] = data.jumlah;
              // this.todo['total'] = data.jumlah;
              if (this.sumKeranjang > 0) {
                this.db[this.sumKeranjang] = this.params;
                this.storage.set('dataBelanja', this.db);
              } else {
                this.db[0] = this.params;
                this.storage.set('dataBelanja', this.db);
              }
              // window.location.reload();

            } // end if
          } // end for

          // this.getKategori(id);
          this.getKeranjang();
          // console.log(this.params);
        } // end handler
      }] // end button
    }); // end alert
    msg.present();
  }



  getShowBarang(id) {
    var url = global.url('barang&id=' + id);

    this.http.get(url)
      .map(res => res.json())
      .subscribe(data => {
        this.arrBarang = data.result;
        this.params['nama_barang'] = data.result.nama_barang;
        this.params['hrgbarang'] = data.result.harga;
        this.params['idBarang'] = data.result.id;
        this.params['img'] = data.result.foto1;
        this.params['desk'] = data.result.deskripsi;

      });
    return this.params;

  }

  getKeranjang() {
    this.navCtrl.push(PesananPage, { user_id: this.idUser });
  }

}
